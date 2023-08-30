const onlyNumber = /\D+/g

function formatReturnOnlyNumber(string){
  if(string){
    return string.replace(onlyNumber,"")
  }
  return undefined
}

module.exports={
  formatReturnOnlyNumber
}