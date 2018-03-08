const http = require('http')
const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1')

// function called downloadPage and taking in a argument that is a URL
const downloadPage = (url='http://nodeprogram.com') => {
  // writes the url to the page
  console.log('downloading ', url)
    // fetch page definition
    const fetchPage = (urlF, callback) => {
      http.get(urlF, (response) => {
        // data from the internet is stored in this buffer
        let buff = ''
        // building the HTML string packet by packet.
        //chunk is the way data comes back from internet
        response.on('data', (chunk) => {
          buff += chunk
      })
        response.on('end', () => {
          callback(null, buff)
      })
    }).on('error', (error) => {
        console.error(`Got error: ${error.message}`)
        callback(error)
    })
  }
  // makes a folder name "uuidv1"
  const folderName = uuidv1()
    fs.mkdirSync(folderName)
    // fetch calls the url from the internet. If there is an error, write it. If no error, write the file to the folder.
    fetchPage(url, (error, data)=>{
      if (error) return console.log(error)
      fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url)
      fs.writeFileSync(path.join(__dirname, folderName, 'file.html'), data)
      console.log('downloading is done in folder ', folderName)
})
}

//process argv ...arguments
// "[2]" becasue we are interested in the URL in the third position
// downloadpage is a function that is defined on line 7. 
downloadPage(process.argv[2])
