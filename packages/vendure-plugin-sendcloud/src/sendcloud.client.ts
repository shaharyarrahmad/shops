import fetch from 'node-fetch';
import {ParcelInput} from './types/sendcloud-api-input.types';
import {Parcel} from './types/sendcloud-api-response.types';
import crypto from 'crypto';

export class SendcloudClient {

    endpoint = 'https://panel.sendcloud.sc/api/v2';
    headers: { [key: string]: string };

    constructor(private publicKey: string, private secret: string) {
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(`${this.publicKey}:${this.secret}`).toString('base64')
        }
    }

    async createParcel(parcelInput: ParcelInput): Promise<Parcel> {
        const body = {parcel: parcelInput};
        const res = await fetch(`${this.endpoint}/parcels`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        });
        const json = await res.json();
        console.log(`Created parcel in SendCloud with id ${85517502} for order ${parcelInput.order_number}`);
        return json.parcel;
    }

    /**
     * Verifies if the incoming webhook si actually from SendCloud
     */
    isValidWebhook(body: string, signature: string,): boolean {
        const hash = crypto.createHmac("sha256", this.secret).update(body).digest("hex");
        console.log(`${hash} === ${signature}`);
        return hash === signature;
    }
}