import { Message, PubSub, Subscription, Topic } from "@google-cloud/pubsub";
import { JobState } from "@vendure/common/lib/generated-types";
import { Job, JobData, JobQueueStrategy, Logger } from "@vendure/core";

// TODO: SUFFIX implementation important!
export class PubSubJobQueueStrategy implements JobQueueStrategy {
  static loggerCtx = "PubsubJobQueue";
  private pubSubClient: PubSub;

  constructor(private options: PubSubOptions) {
    this.pubSubClient = new PubSub({ projectId: options.projectId });
  }

  async add<Data extends JobData<Data> = {}>(
    job: Job<Data>
  ): Promise<Job<Data>> {
    const topic = await this.getOrCreateTopic(job.queueName);
    const id = await topic.publish(Buffer.from(JSON.stringify(job.data)));
    Logger.debug(`Sent message ${job.queueName}: ${id}`);
    return new Job<Data>({
      id,
      queueName: job.queueName,
      data: job.data,
      attempts: 0,
      state: JobState.PENDING,
      createdAt: new Date(),
    });
  }

  async start<Data extends JobData<Data> = {}>(
    queueName: string,
    process: (job: Job<Data>) => Promise<any>
  ) {
    const subscription = await this.getOrCreateSubscription(queueName);
    subscription.on("message", (message: Message) => {
      Logger.debug(
        `Received message: ${queueName}: ${message.id}`,
        PubSubJobQueueStrategy.loggerCtx
      );
      const job = new Job<Data>({
        id: message.id,
        queueName,
        data: JSON.parse(message.data.toString()),
        attempts: message.deliveryAttempt,
        state: JobState.RUNNING,
        startedAt: new Date(),
        createdAt: message.publishTime,
      });
      process(job)
        .then(() => {
          message.ack();
        })
        .catch((err) => {
          message.nack();
        });
    });
  }

  async stop<Data extends JobData<Data> = {}>(
    queueName: string,
    process: (job: Job<Data>) => Promise<any>
  ) {
    const subscription = await this.getOrCreateSubscription(queueName);
    await subscription.delete();
  }

  private async getOrCreateTopic(queueName: string): Promise<Topic> {
    const topic = this.pubSubClient.topic(queueName);
    const [exists] = await topic.exists();
    if (!exists) {
      await topic.create();
      Logger.info(
        `Created topic ${queueName} in project ${this.options.projectId}`,
        PubSubJobQueueStrategy.loggerCtx
      );
    }
    return topic;
  }

  private async getOrCreateSubscription(
    queueName: string
  ): Promise<Subscription> {
    const subscriptionName = `${queueName}-subscription`;
    const subscription = this.pubSubClient
      .topic(queueName)
      .subscription(subscriptionName);
    const [exists] = await subscription.exists();
    if (!exists) {
      const topic = await this.getOrCreateTopic(queueName);
      await topic.createSubscription(subscriptionName);
      Logger.info(
        `Created subscription ${subscriptionName} in project ${this.options.projectId}`,
        PubSubJobQueueStrategy.loggerCtx
      );
    }
    return subscription;
  }
}

export interface PubSubOptions {
  projectId: string;
  concurrency: number;
  /**
   * Optional suffix, I.E. for differentiating between test, acc and prod queues
   */
  queueSuffix?: string;
}
