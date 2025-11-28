import dTable from '../../components/shared/dTable/dTable.js'

export const users = {
  init: async () => {
    console.log('Users')
    await dTable.init()
  }
}
