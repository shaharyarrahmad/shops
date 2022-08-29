# Pinelab Storefronts

Each subfolder of `clients` hold the storefront of one of Pinelab's clients.

## Prerequisites

Before you get started, you should have these things installed:

1. `git`
2. `nvm`
3. `yarn`

## Running an existing shop

1. Go into the directory of a storefront with the command `cd cantastic`
2. Tell NVM that we use Node v16 by executing the command `nvm use 16`
3. Run `yarn` to install all dependencies
4. Run `yarn gridsome develop` to run the project locally

## Pushing changes

Make your changes on a feature branch and create a Pull Request to merge the changes into the development branch. So,
before you make any changes:

1. Checkout the development branch: `git checkout develop`
2. Make sure you have the lastest changes with `git pull`
3. Create a feature branch with `git checkout -b feat/your-branch-name` or `git checkout -b fix/your-branch-name` if your change is a fix.
4. Make and test your changes locally.
5. Commit your changes with `git commit -a -m 'feat(cantastic): made some changes'`
6. Push your changes to GitHub with `git push`
7. Create a Pull Request on GitHub to merge branch `feat/your-branch-name` into `develop`
8. Get your Pull Request reviewed by someone
9. Merge your Pull request after approval
