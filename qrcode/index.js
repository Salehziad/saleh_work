const qr=require('qrcode')

let data={
    "name":"saleh",
    // "email":"salehziad1999@gmail.com",
    // "gender":"male",
    "id":12
}

let stJson=JSON.stringify(data);

qr.toString(stJson,{type:"terminal"},function(err,code){
    if(err) return console.log(err);
    console.log(code);
})


// qr.toFile(
//     'foo.png',
//     [{ data: new Uint8ClampedArray([253,254,255]), mode: 'byte' }]
//   ,function(err,code){
//     console.log(code);
//   })

// const url = "https://google.com"

// qr.toFile('qr.png', url, {
//   scale: 10,
//   color: {
//     dark: '#000',  // Blue dots
//     light: '#fff' // Transparent background
//   }
// }, function (err) {
//   if (err) throw err
//   console.log('done')
// })
