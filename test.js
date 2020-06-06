console.log(arrangeScores(0.5, [1,2,3]))

function arrangeScores(num, array) {
    if (array.length == 0) {
      array.push(num)
    } else if(num < array[0]) {
        array.unshift(num)
    } else if (num > array[array.length-1]) {
        array.push(num)
    }
     else {
      for (i=0; i < array.length-1; i++) {
        if (num > array[i] && num <= array[i+1]) {
          array.splice(i+1, 0, num)
          console.log("works")
          break
        }
      }
    }
    return array
  }