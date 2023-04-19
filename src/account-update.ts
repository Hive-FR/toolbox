import assert from 'assert'

import inquirer, { Answers } from 'inquirer'

import { Client, AccountUpdateOperation, PrivateKey } from '@hiveio/dhive'

export const accountAddKey = async (): Promise<void> => {
  try {
    const answers: Answers = await inquirer.prompt([
      {
        type: "input",
        name: "rpcNode",
        message: "Quel est le rpcNode à utiliser ?",
        default: "https://api.openhive.network"
      },
      {
        type: "input",
        name: "username",
        message: "Quel est le nom d'utilisateur Hive ?",
      },
      {
        type: "input",
        name: "signingKey",
        message: "Quel est la clé OWNER privé de l'utilisateur ?",
      },
      //------------------------------------------
      {
        type: "confirm",
        name: "addToOwner",
        message: "Ajouter une clé dans OWNER ?",
        default: false
      },
      {
        type: "input",
        name: "weigthThresholdOwner",
        message: "Saisir le niveau de poids (weight_threshold) requis pour OWNER (entre 1 et 9)",
        when: (answers) => answers.addToOwner,
        validate(value) {
          const pass = value.match(
            /^([1-9])$/
          );
          if (pass) {
            return true;
          }
    
          return 'Entrez uniquement un chiffre entre 1 et 9';
        },
      },
      {
        type: "input",
        name: "weigthOwner",
        message: "Saisir le poids de la clé OWNER (entre 1 et 9)",
        when: (answers) => answers.addToOwner,
        validate(value) {
          const pass = value.match(
            /^([1-9])$/
          );
          if (pass) {
            return true;
          }
    
          return 'Entrez uniquement un chiffre entre 1 et 9';
        },
      },
      {
        type: 'input',
        name: 'keyOwner',
        message: 'Quel est la clé OWNER publique à ajouter ?',
        when: (answers) => answers.addToOwner,
      },
      //------------------------------------------
      {
        type: "confirm",
        name: "addToActive",
        message: "Ajouter une clé dans ACTIVE ?",
        default: false
      },
      {
        type: "input",
        name: "weigthThresholdActive",
        message: "Saisir le niveau de poids (weight_threshold) requis pour ACTIVE (entre 1 et 9)",
        when: (answers) => answers.addToActive,
        validate(value) {
          const pass = value.match(
            /^([1-9])$/
          );
          if (pass) {
            return true;
          }
    
          return 'Entrez uniquement un chiffre entre 1 et 9';
        },
      },
      {
        type: "input",
        name: "weigthActive",
        message: "Saisir le poids de la clé ACTIVE (entre 1 et 9)",
        when: (answers) => answers.addToActive,
        validate(value) {
          const pass = value.match(
            /^([1-9])$/
          );
          if (pass) {
            return true;
          }
    
          return 'Entrez uniquement un chiffre entre 1 et 9';
        },
      },
      {
        type: 'input',
        name: 'keyActive',
        message: 'Quel est la clé ACTIVE publique à ajouter ?',
        when: (answers) => answers.addToActive,
      },
      //------------------------------------------
      {
        type: "confirm",
        name: "addToPosting",
        message: "Ajouter une clé dans POSTING ?",
        default: false
      },
      {
        type: "input",
        name: "weigthThresholdPosting",
        message: "Saisir le niveau de poids (weight_threshold) requis pour POSTING (entre 1 et 9)",
        when: (answers) => answers.addToPosting,
        validate(value) {
          const pass = value.match(
            /^([1-9])$/
          );
          if (pass) {
            return true;
          }
    
          return 'Entrez uniquement un chiffre entre 1 et 9';
        },
      },
      {
        type: "input",
        name: "weigthPosting",
        message: "Saisir le poids de la clé POSTING (entre 1 et 9)",
        when: (answers) => answers.addToPosting,
        validate(value) {
          const pass = value.match(
            /^([1-9])$/
          );
          if (pass) {
            return true;
          }
    
          return 'Entrez uniquement un chiffre entre 1 et 9';
        },
      },
      {
        type: 'input',
        name: 'keyPosting',
        message: 'Quel est la clé POSTING publique à ajouter ?',
        when: (answers) => answers.addToPosting,
      },
    ])
    assert(answers['rpcNode'] && answers['username'], "le RPC ou le nom d'utilisateur ne peuvent être vide!")
    assert(answers['signingKey'], "la clé OWNER pour signer la transaction est manquante!")

    const client = new Client([answers['rpcNode']], { timeout: 1500 })
    const accounts = await client.database.getAccounts([answers['username']])
    assert(accounts[0], `Utilisateur inconnue! ${ answers['username'] }`)

    const AccountUpdate: AccountUpdateOperation = [
      'account_update',
      {
        account: accounts[0].name,
        json_metadata: accounts[0].json_metadata,
        memo_key: accounts[0].memo_key,
      }
    ];

    /** Owner key */
    if(answers['addToOwner']) {
      assert(answers['weigthThresholdOwner'] && answers['weigthOwner'], "Poids manquant!")
      assert(answers['keyOwner'], "La clé OWNER à ajouter est manquante!")

      const owner = accounts[0].owner
      owner.weight_threshold = Number(answers['weigthThresholdOwner'])

      const indexKey = owner.key_auths.findIndex(k => k[0] === answers['keyOwner'])
      if(indexKey >= 0) {
        owner.key_auths[indexKey]![1] = Number(answers['weigthOwner']) 
      } else {
        owner.key_auths.push([answers['keyOwner'], Number(answers['weigthOwner'])])
      }

      owner.key_auths = sort(owner.key_auths)
      AccountUpdate[1].owner = owner
    }

    /** Active key */
    if(answers['addToActive']) {
      assert(answers['weigthThresholdActive'] && answers['weigthActive'], "Poids manquant!")
      assert(answers['keyActive'], "La clé ACTIVE à ajouter est manquante!")

      const active = accounts[0].active
      active.weight_threshold = Number(answers['weigthThresholdActive'])

      const indexKey = active.key_auths.findIndex(k => k[0] === answers['keyActive'])
      if(indexKey >= 0) {
        active.key_auths[indexKey]![1] = Number(answers['weigthActive']) 
      } else {
        active.key_auths.push([answers['keyActive'], Number(answers['weigthActive'])])
      }

      active.key_auths = sort(active.key_auths)
      AccountUpdate[1].active = active
    }

    /** Posting key */
    if(answers['addToPosting']) {
      assert(answers['weigthThresholdPosting'] && answers['weigthPosting'], "Poids manquant!")
      assert(answers['keyPosting'], "La clé OWNER à ajouter est manquante!")

      const posting = accounts[0].posting
      posting.weight_threshold = Number(answers['weigthThresholdPosting'])

      const indexKey = posting.key_auths.findIndex(k => k[0] === answers['keyPosting'])
      if(indexKey >= 0) {
        posting.key_auths[indexKey]![1] = Number(answers['weigthPosting']) 
      } else {
        posting.key_auths.push([answers['keyPosting'], Number(answers['weigthPosting'])])
      }

      posting.key_auths = sort(posting.key_auths)
      AccountUpdate[1].posting = posting
    }

    console.log()
    console.log('\x1b[1;33m%s\x1b[0m', `AccountUpdate:`, AccountUpdate)

    const privateKey = PrivateKey.from(answers['signingKey']);
    const r = await client.broadcast.sendOperations([AccountUpdate], privateKey);
    console.log(`\x1b[1;35m[broadcast result]\x1b[0m`, r);
  } catch (e) {
    throw e
  }
}

const sort = (array: [string | any, number][]) => {
  return array.sort((a, b) => a[0].localeCompare(b[0]))
}