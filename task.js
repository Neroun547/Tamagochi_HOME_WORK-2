/* Native JS -_- ..... -_- */

let arr = [12, 2, 4, 2, 1203];
function forItems(el, method) {
    if (el !== 0 && el > 0) {
        if(typeof method === 'function'){
            method(el);
            return forItems(el -= 1, method);
        }
    }
    if (el < 0) {
        if(typeof method === 'function'){
            method(el);
            return forItems(el += 1, method);
        }
    }
}

function test(i){
    console.log(arr[i]);
}

console.log(forItems(arr.length, test));
// Sum array
function sum(a) {

    let currentSum = a;

    function f(b) {
        currentSum += b;
        return f;
    }

    f.toString = function () {
        return currentSum;
    };

    return f;
}

console.log(sum(10)(3)(5));


//multiply, add, result....

Object.prototype.add = function(b){
    return this + b;
}

Object.prototype.multiply = function (b){
    return this * b;
}

Object.prototype.result = function (b){
    return this;
}
function myFc(a){
    return a;
}

myFc(10).add(2).multiply(2).result();

//ForEach
Array.prototype.myForeach = function(callback){
    for(let i = 0; i < this.length; i++){
        callback(this[i], i, this);
    }
}

[1,2,3,4].myForeach((el, i, arr) => {
    console.log("El: ", el, "index: ", i, "Array: ", arr);
})

//MyMap

Array.prototype.myMap = function(callback){
    const newList = [];
        for(let i = 0; i < this.length; i++){
            newList.push(callback(this[i], i, this));
        }
        return newList;
    }

    const newl = [12, 2, 4, 3, 10].myMap((el, i, arr) => {
        return el;
    });
    
    console.log(newl);

//MySort

Array.prototype.mySort = function(callback){
    const newList = [];
    const iterableList = this.join(' ').split(' ');
    let el = Infinity;
    let index;

    if(typeof callback === 'function'){
        for(let i = 0; i < iterableList.length; i++){
            if(iterableList[i] < el){
                el = iterableList[i];
            }
            for(let j = 0; j < iterableList.length; j++){
                if(callback(iterableList[j], el) <= 0){
                    index = j;
                    el = iterableList[j];
                }
            }
            iterableList.splice(index, 1, Infinity);   
            newList.push(el);
            el = Infinity;
        }
        return newList;
    } else {
        for(let i = 0; i < iterableList.length; i++){
        if(el < iterableList[i]){
            el = iterableList[i];
        }
        for(let j = 0; j < iterableList.length; j++){
            if(el > iterableList[j]){
               el = iterableList[j];
               index = j;
            }
        }
        iterableList.splice(index, 1, Infinity);
        newList.push(el);
        el = Infinity;    
    }
    return newList;
    }
}

[1231, 2,100000].mySort((a, b) => {
    return a - b;
});

//MyFilter
Array.prototype.myFilter = function(callback){
    const newList = [];
        for(let i = 0; i < this.length; i++){
            if(callback(this[i], i, this)){
                newList.push(this[i]);
            }
        }
        return newList;
}

[123, 2, 4, 123123].myFilter((el, i, arr) => {
    console.log("Element: ", el, 'index: ', i, 'arr: ', arr);
    return el < 10;
});

//My Find....
Array.prototype.myFind = function(callback){
    for(let i = 0; i < this.length; i++){
        if(callback(this[i], i, this)){
            return this[i];
        }
    }
}

[123, 2, 4,2, 434].myFind((el, i, arr) => {
    console.log("Element: ", el, "index: ", i, 'arr: ', arr);
    return el > 100;
})

/* -_- -_-  */
