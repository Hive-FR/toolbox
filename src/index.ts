import assert from 'assert'

import inquirer, { Answers } from 'inquirer'

/** Cases */
import { generateKeys, regenerateKeys } from './keys-generation.js'
import { accountAddKey }                from './account-update.js'

console.log()
console.log('\x1b[1;33m%s\x1b[0m', '------------------------------------------')
console.log('\x1b[1;33m%s\x1b[0m', `Boite à outils de la blockchain Hive`)
console.log()

inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Que voulez vous faire?',
      choices: ['Générer des clés HIVE', 'Regénérer des clés HIVE à partir du Master password', 'Ajouter une/des clé(s) à un compte Hive'],
    }
  ])
  .then(async (main) => {
    switch (main['action']) {
      case 'Générer des clés HIVE':
        await generateKeys()
        break

      case 'Regénérer des clés HIVE à partir du Master password':
        await regenerateKeys()
        break

      case 'Ajouter une/des clé(s) à un compte Hive':
        await accountAddKey()
        break        
    }
  })
  .catch(e => console.log('\x1b[31m%s\x1b[0m', `Error: ${ e instanceof Error ? e.message : e }`))
