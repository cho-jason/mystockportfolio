const db = require('./db')
const { User, Stock, Transaction } = require('./db/models')

const seed = async () => {
  try {
    await db.sync({ force: true })
    console.log('db synced!')

    const jason = await User.create({
      name: 'Jason Cho',
      email: 'jason@email.com',
      password: '1234567890'
    })

    const vtiBuy5 = await Transaction.create({
      stockSymbol: 'vti',
      shares: 5,
      pricePerShare: 8000
    })
    await jason.addTransaction(vtiBuy5)
    jason.balance -= 5 * 8000
    await jason.save()

    const vti = await Stock.create({
      symbol: 'vTi',
      shares: 5
    })
    await jason.addStock(vti)

    const vtiBuy30 = await Transaction.create({
      stockSymbol: 'vti',
      shares: 30,
      pricePerShare: 7500
    })
    await jason.addTransaction(vtiBuy30)
    jason.balance = jason.balance - 30 * 7500
    await jason.save()

    vti.shares += vtiBuy30.shares
    await vti.save()

    const jacob = await User.create({
      name: 'Jacob Cho',
      email: 'jacob@email.com',
      password: '123'
    })

    const bndBuy5 = await Transaction.create({
      stockSymbol: 'bnd',
      shares: 5,
      pricePerShare: 8000
    })
    await jacob.addTransaction(bndBuy5)
    jacob.balance -= 5 * 8000
    await jacob.save()

    const bnd = await Stock.create({
      symbol: 'bnd',
      shares: 5
    })
    await jacob.addStock(bnd)
  } catch (err) {
    console.log(err.message)
    // console.error(err.errors[0].message)
  } finally {
    await db.close()
  }
}

seed()
