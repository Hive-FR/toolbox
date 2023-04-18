import assert from 'assert'

import inquirer, { Answers } from 'inquirer'

import { createHash } from 'crypto'
import Chance from 'chance'

import { PrivateKey } from '@hiveio/dhive'

/**
 * address prefix (public key).
 */
export const addressPrefix = 'STM'

type Keys = {
  owner:   string
  active:  string
  posting: string
  memo:    string
}

/**
* Return sha256 hash of input.
*/
const sha256 = (input: Buffer | string): Buffer => {
  return createHash('sha256')
    .update(input)
    .digest()
}

export const generateKeys = async (): Promise<void> => {
  try {
    const answers: Answers = await inquirer.prompt([
      {
        type: "confirm",
        name: "hasUsername",
        message: "Saisir un nom d'utilisateur ou le générer ?",
        default: false
      },
      {
        type: "input",
        name: "username",
        message: "Saisir un nom d'utilisateur:",
        when: (answers) => answers.hasUsername,
      },
      {
        type: "confirm",
        name: "hasPassword",
        message: "Saisir un Master Password ou le générer ?",
        default: false
      },
      {
        type: "input",
        name: "masterPassword",
        message: "Saisir un mot de passe:",
        when: (answers) => answers.hasPassword,
      },
    ])
    let username = answers['username'] ? answers['username'] : undefined
    let password = answers['masterPassword'] ? answers['masterPassword'] : undefined

    const chance   = new Chance()

    /** Generate random username */
    if(!username) {
      username = chance.string({ length: 12, pool: 'abcdefghijklmnopqrstuvwxyz' })
    }

    /** Generate random hash password */
    if(!password) {
      password = chance.hash({ length: 64 })
    }
    
    console.log()
    console.log('\x1b[1;32m%s\x1b[0m', `Nom HIVE:`, username)

    const masterPassword = sha256(password as string)
    console.log()
    console.log('\x1b[1;33m%s\x1b[0m', `Master password:`, masterPassword.toString('hex'))

    const ownerKey   = PrivateKey.fromLogin(username, masterPassword.toString('hex'), 'owner')
    const activeKey  = PrivateKey.fromLogin(username, masterPassword.toString('hex'), 'active')
    const postingKey = PrivateKey.fromLogin(username, masterPassword.toString('hex'), 'posting')
    const memoKey    = PrivateKey.fromLogin(username, masterPassword.toString('hex'), 'memo')

    const PrivKeys: Keys = {
      owner:   ownerKey.toString(), 
      active:  activeKey.toString(), 
      posting: postingKey.toString(), 
      memo:    memoKey.toString(), 
    }
    console.log()
    console.log('\x1b[1;35m%s\x1b[0m', 'Clés privées:', { PrivKeys })
    console.log('\x1b[1;35m%s\x1b[0m','------------------------------------------')

    const PubKey: Keys = {
      owner:   ownerKey.createPublic(addressPrefix).toString() , 
      active:  activeKey.createPublic(addressPrefix).toString(), 
      posting: postingKey.createPublic(addressPrefix).toString(), 
      memo:    memoKey.createPublic(addressPrefix).toString(), 
    }
    console.log()
    console.log('\x1b[1;36m%s\x1b[0m', 'Clés publiques:', { PubKey })
    console.log('\x1b[1;36m%s\x1b[0m','------------------------------------------')
  } catch (e) {
    throw e
  }
}

export const regenerateKeys = async (): Promise<void> => {
  try {
    const answers: Answers = await inquirer.prompt([
      {
        type: "input",
        name: "username",
        message: "Saisir le nom d'utilisateur:",
      },
      {
        type: 'input',
        name: 'masterPassword',
        message: 'Saisissez le Master password',
      },
    ])
    assert(answers['username'] && answers['masterPassword'], `Processus avorté par l'utilisateur!`)

    const username = answers['username']
    const masterPassword = answers['masterPassword']

    console.log()
    console.log('\x1b[1;33m%s\x1b[0m', `Master password:`, masterPassword)
  
    const ownerKey   = PrivateKey.fromLogin(username, masterPassword, 'owner')
    const activeKey  = PrivateKey.fromLogin(username, masterPassword, 'active')
    const postingKey = PrivateKey.fromLogin(username, masterPassword, 'posting')
    const memoKey    = PrivateKey.fromLogin(username, masterPassword, 'memo')

    const PrivKeys: Keys = {
      owner:   ownerKey.toString(), 
      active:  activeKey.toString(), 
      posting: postingKey.toString(), 
      memo:    memoKey.toString(), 
    }
    console.log()
    console.log('\x1b[1;35m%s\x1b[0m', 'Clés privées:', { PrivKeys })
    console.log('\x1b[1;35m%s\x1b[0m','------------------------------------------')

    const PubKey: Keys = {
      owner:   ownerKey.createPublic(addressPrefix).toString() , 
      active:  activeKey.createPublic(addressPrefix).toString(), 
      posting: postingKey.createPublic(addressPrefix).toString(), 
      memo:    memoKey.createPublic(addressPrefix).toString(), 
    }
    console.log()
    console.log('\x1b[1;36m%s\x1b[0m', 'Clés publiques:', { PubKey })
    console.log('\x1b[1;36m%s\x1b[0m','------------------------------------------')
  } catch (e) {
    throw e
  }
}