const shuffleData = (data) => {
    let current = data.length
    let random
    let temp
    while (current) {
      random = Math.floor(Math.random() * current--)
      temp = data[current]
      data[current] = data[random]
      data[random] = temp
    }
    return data
}

export default shuffleData