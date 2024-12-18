import { useSnapshot } from 'valtio'
import { useEffect } from 'react'
import state from './../store'

const Saved = () => {
  const snap = useSnapshot(state)

  useEffect(() => {
    const getSavedData = () => {
      const savedData = JSON.parse(localStorage.getItem('SL_SAVED_T_SHIRT')!)
      state.saved = savedData
    }

    getSavedData()
  }, [])

  return (
    <main className='w-full h-screen overflow-hidden bg-home-gradient relative'>
      {
        snap.saved.map(item => (
          <h1>{item.name}</h1>
        ))
      }
    </main>
  )
}

export default Saved