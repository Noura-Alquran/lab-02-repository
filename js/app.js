'use strict';

let arrayOfCurrentObjects=[]; 
let pageOne=[];
let pageTwo=[];

const ajaxSettings = {
    method: "get",
    dataType: "json",
  };
  
$.ajax("data/page-1.json", ajaxSettings).then((arr) => {
    arr.forEach((horn) => {
  pageOne.push(new NewHorn(horn));
  
})
let keywordarrayOne=[];
pageOne.forEach(horn=>{
  horn.renderhorn();
  arrayOfCurrentObjects.push(horn);
  if(!keywordarrayOne.includes(horn.keyword)){
    keywordarrayOne.push(horn.keyword);
   
    $('select').append('<option value ='+ horn.keyword + '>'+ horn.keyword +'</option>');
    }
   
  })
  $('input:radio[name=sorting]:checked').is(function () {
      if ($("input[name='sorting']:checked").val() == 'sortTitle') {
        $('section').remove();
        sortHornsByTitle(arrayOfCurrentObjects);
      }
    });
  $('input:radio[name=sorting]').click(function () {
        if($(this).val()=='sortTitle'){
           $('section').remove();
        sortHornsByTitle(arrayOfCurrentObjects); 
      }
      else {
         $('section').remove();
        sortHornsByNum(arrayOfCurrentObjects);
      }
      
      
     
}); });
$.ajax("data/page-2.json", ajaxSettings).then((arr) => {
  arr.forEach((horn) => {
pageTwo.push(new NewHorn(horn));
})
});

$("#butOne").click(function(){ 
  $('section').remove();
  let keywordarrayOne=[];
  pageTwo.forEach(horn=>{
    $('select').children(`option[value=${horn.keyword}]`).hide();

  })
  arrayOfCurrentObjects=[];
  pageOne.forEach(horn=>{
   arrayOfCurrentObjects.push(horn); 
   horn.renderhorn();
    if(!keywordarrayOne.includes(horn.keyword)){
      keywordarrayOne.push(horn.keyword);
     
      $('select').append('<option value ='+ horn.keyword + '>'+ horn.keyword +'</option>');
      }
      
      
  });
 
  });

$("#butTwo").on('click',function(){ 
  $('section').remove();
  let keywordarrayTwo=[];
  $('option').hide();
   arrayOfCurrentObjects=[];
   pageTwo.forEach(horn=>{
    horn.renderhorn();
     arrayOfCurrentObjects.push(horn);
     if(!keywordarrayTwo.includes(horn.keyword)){
      keywordarrayTwo.push(horn.keyword);
      $('select').append('<option value ='+ horn.keyword + '>'+ horn.keyword +'</option>');
      }
     
     
  });
  $('input:radio[name=sorting]:checked').is(function () {
    if ($("input[name='sorting']:checked").val() == 'sortTitle') {
      $('section').remove();
      sortHornsByTitle(arrayOfCurrentObjects);
    }
  });

})

function NewHorn (horn){
this.image_url=horn.image_url;
this.title=horn.title;
this.description=horn.description;
this.keyword=horn.keyword;
this.horns=horn.horns;
// arrayOfObjects.push(this);
}

NewHorn.prototype.renderhorn=function(){
  let template= $("#photo-template").html();
  let html = Mustache.render(template,this);
  $("main").append(html); 
}

arrayOfCurrentObjects.forEach(horn=>{
  $('section').attr("class", horn.keyword); 
});

$('select').on('change', handleFilter);

function handleFilter (event){
    event.preventDefault();
    $('section').remove();
    $("#photo-template").html();
    let selectedValue = $('option:selected').val();

    arrayOfCurrentObjects.forEach(element => {
          if (selectedValue === element.keyword){
           element.renderhorn();
 
          }
         }
    )}
 

function sortHornsByTitle(array) {
 array.sort((a,b)=>{
  if (a.title<b.title){
      return -1;
  }else if (a.title>b.title){
      return 1;
  }
  else {
      return 0;
  }
 })
 array.forEach(horn=>{
   horn.renderhorn();
 })

}

function sortHornsByNum(array) {
  
  array.sort((a,b)=>{
    return b.horns - a.horns ;
     
    })
  array.forEach(horn=>{
      horn.renderhorn();})
};

