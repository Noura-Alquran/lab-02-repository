'use strict';

const ajaxSettings = {
    method: "get",
    dataType: "json",
  };
  
$.ajax("data/page-1.json", ajaxSettings).then((arr) => {
    arr.forEach((horn) => {
  let hornimg=new newHorn(horn).render();

})
  checkkeywords();
});

let arrayOfObjects=[]; 

function newHorn (horn){
this.image_url=horn.image_url;
this.title=horn.title;
this.description=horn.description;
this.keyword=horn.keyword;
this.horns=horn.horns;
arrayOfObjects.push(this);

}
console.log(arrayOfObjects);
newHorn.prototype.render = function () {

    let clonedDiv = $("#photo-template").html();
    let newSection = $('<section></section>').html(clonedDiv);
    let newOption = $('<option></option>');
    newSection.find("h2").text(this.title);
    newSection.find("img").attr("src", this.image_url);
    newSection.find("p").text(`${this.description} , horns num is ${this.horns}`);
    newSection.attr("class", this.keyword); 
    $("main").append(newSection); 
    
  };

let keywordarray=[];

function checkkeywords(arr){
    arrayOfObjects.forEach(element=>{
      if(!keywordarray.includes(element.keyword)){
      keywordarray.push(element.keyword);
      $('select').append('<option value ='+ element.keyword + '>'+ element.keyword +'</option>');
      }
    })
}
console.log(keywordarray);

$('select').on('change', handleFilter);

function handleFilter (event){
    event.preventDefault();
    $('section').hide();
    let filter=[];
    let selectedValue = $('option:selected').val();
    arrayOfObjects.forEach(element => {
          if (selectedValue === element.keyword){
              console.log(selectedValue);
            filter.push(element);
            console.log(filter);
           $("."+selectedValue).show();
            
          }
         }
    )
 
}






