import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as dotenv from 'dotenv'

const testSkipWhenNoNetwork = () => {
  dotenv.config()
  const t = process.env.NO_NETWORK
  if (process.env.NO_NETWORK && process.env.NO_NETWORK === 'true') {
    return test.skip
  }
  return test
}

// shows how the runner will run a javascript action with env / stdout protocol
testSkipWhenNoNetwork()(
  'test runs',
  () => {
    dotenv.config()
    const np = process.execPath
    const ip = path.join(__dirname, '..', 'lib', 'main.js')
    const options: cp.ExecFileSyncOptions = {
      env: process.env
    }
    try {
      console.log(cp.execFileSync(np, [ip], options).toString())
    } catch (e: any) {
      console.log(e.stdout.toString())
      console.log(e.stderr.toString())
      throw e
    }
  },
  100000
)
