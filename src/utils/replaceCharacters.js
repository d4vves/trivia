const replaceCharacters = (element) => {
    return element
      .replace(/&quot;/g,'"')
      .replace(/&#039;/g,"'")
  }

  export default replaceCharacters