var inputEle = document.getElementById('size');
var n = inputEle.value ||20 ;
var array = [];
var moves = [];

inputEle.addEventListener('input', () => {
    if(inputEle.value <4 || inputEle.value>100){
        n=4;
    }
    else{
        n = inputEle.value;
    }
    generatearray();
});
function generatearray() {
    array = [];
    for (var i = 0; i < n; i++) {
        array[i] = Math.random() * 100;
    }
    showbars();
}
window.onload=generatearray();
function showbars(move){
    bars.innerHTML="";
    const barWidth = Math.max(2, Math.floor(400 / n));
    for(var i=0;i<n;i++){
        const bar = document.createElement("div");
        bar.style.height=array[i]+"%";
        bar.style.width = barWidth + "px";
        bar.classList.add("bar");

        if(move && move.indices.includes(i)){
            bar.style.backgroundColor= move.type=="swap"?"red":"yellow";
        }
        bars.appendChild(bar);
    }
}

function b1(){
    const sortedArray = [...array];
     moves = bubbleSort(sortedArray);
    displayEachSwap(moves);
}
function bubbleSort(array){
    const moves = [];
    for(let i=n-1;i>=1;i--){
        var didSwap =0;
        for(let j=0;j<i;j++){
            moves.push({indices:[j,j+1],type:"comp"});
            if(array[j]>array[j+1]){
                moves.push({indices:[j,j+1],type:"swap"});
                [array[j],array[j+1]]=[array[j+1],array[j]];
                didSwap=1;
            }
        }
        if(didSwap==0){
            break;
        }
    }
    // showbars();
    return moves;
}
function b2(){
    const sortedArray = [...array];
     moves = selectionSort(sortedArray);
    displayEachSwap(moves);
}
function selectionSort(array){
    const moves=[];

    for(let i=0;i<n-1;i++){
        min = array[i];
        minI=i;
        for(let j=i;j<n;j++){
            moves.push({indices:[i,j],type:"comp"});
            if(min>array[j]){
                min = array[j];
                minI = j;
            }
        }
        moves.push({indices:[i,minI],type:"swap"});
        [array[i],array[minI]] = [array[minI],array[i]];
    }
    return moves;
}

function mergeSort(array, low, high, moves) {
    if (low >= high) return;
    var mid = Math.floor((low + high) / 2);
    mergeSort(array, low, mid, moves);
    mergeSort(array, mid + 1, high, moves);
    merge(array, low, mid, high, moves);
}
function merge(array, low, mid, high, moves) {
    let left = array.slice(low, mid + 1);
    let right = array.slice(mid + 1, high + 1);
    let i = 0, j = 0, k = low;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            moves.push({ indices: [k], type: "swap", value: left[i] });
            array[k] = left[i];
            i++;
        } else {
            moves.push({ indices: [k], type: "swap", value: right[j] });
            array[k] = right[j];
            j++;
        }
        k++;
    }

    while (i < left.length) {
        moves.push({ indices: [k], type: "swap", value: left[i] });
        array[k] = left[i];
        i++;
        k++;
    }
    while (j < right.length) {
        moves.push({ indices: [k], type: "swap", value: right[j] });
        array[k] = right[j];
        j++;
        k++;
    }
}

function b3() {
    const sortedArray = [...array];
    moves = [];
    mergeSort(sortedArray, 0, n - 1, moves);
    // console.log(moves);
    displayEachSwap(moves);
}
function displayEachSwap(moves){
    if(moves.length == 0){
        showbars();
        const bars = document.querySelectorAll(".bar");
        bars.forEach(bar => {
            bar.style.backgroundColor = "green";
        });
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;
    if(move.type == "swap"){
        if (j !== undefined) {
            [array[i], array[j]] = [array[j], array[i]];
        } else {
            array[i] = move.value;
        }
    }
    showbars(move);
    // const sortedArray = [...array].sort((a, b) => a - b);
    // const bars = document.querySelectorAll(".bar");
    // for (let k = 0; k < n; k++) {
    //     if (array[k] === sortedArray[k]) {
    //         bars[k].style.backgroundColor = "green";
    //     }
    // }
    setTimeout(function(){
        displayEachSwap(moves);
    }, 100);
}




