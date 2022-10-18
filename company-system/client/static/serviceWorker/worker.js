this.serviceWorker = await navigator.serviceWorker.register(
  self.addEventListener('push', (e) => {
    try {
      console.log(e)
      const data = e.data.json()
      console.log('Push Recieved...')
      self.registration.showNotification(data.title, {
        body: 'Notified by Traversy Media!',
        icon: 'http://image.ibb.co/frYOFd/tmlogo.png',
      })
    } catch (error) {
      console.log('err', error)
    }
  })
)