
var  resultHi = JSON.parse(sessionStorage._t);


var arraySkinMoleArray = [
  
];

var arraySkinMoleArray1 = resultHi.data.facedata.generalResult.data[3].data;

if(arraySkinMoleArray1.length >0)
{
  arraySkinMoleArray = arraySkinMoleArray1[0].drawArr;
}

var faceArea = {
  "height": 100.6203,
  "left": 102.71003,
  "top": 62.76482,
  "width": 105.47623
};
faceArea= resultHi.data.rectangle;

var xAnumber = faceArea.left;
var yAnumber = faceArea.top;
var ratex = faceArea.width/5;
var ratey = faceArea.height/2;
var ratexy= 0.2;
var htmlElement = '';
document.addEventListener("DOMContentLoaded", function(event) {
     var htmlElement2 ='';
        arraySkinMoleArray.forEach(itemSkinMole => {
            
             var outPutRule = checknumber12( itemSkinMole, faceArea);
             if(outPutRule < 0)
             {
                outPutRule = checknumber34(itemSkinMole, faceArea);

                if(outPutRule <0 )
                {
                    outPutRule = checknumber56(itemSkinMole, faceArea);
                    if(outPutRule <0)
                    {
                        outPutRule = checknumber78(itemSkinMole, faceArea);
                            if(outPutRule <0)
                        {
                            outPutRule = checknumber78dowm(itemSkinMole, faceArea);
                            if(outPutRule <0)
                    {
                        outPutRule = checknumber910(itemSkinMole, faceArea);
                        if(outPutRule<0)
                        {
                          
                            outPutRule = checknumber1112dowm(itemSkinMole, faceArea);
                            if(outPutRule<0)
                            {  
                              outPutRule = checknumber13(itemSkinMole, faceArea);

                              if(outPutRule<0)
                              {
                                outPutRule = checknumber1415(itemSkinMole, faceArea);
                                if(outPutRule < 0)
                                {
                                  outPutRule = checknumber1617(itemSkinMole, faceArea);

                                  if(outPutRule <0)
                                  {
                                    outPutRule = checknumber2324(itemSkinMole, faceArea);
                                    if(outPutRule <0)
                                    {
                                      outPutRule = checknumber2122(itemSkinMole, faceArea);

                                      if(outPutRule <0)
                                      {
                                        outPutRule = checknumber18(itemSkinMole, faceArea);
                                        if(outPutRule <0)
                                        {
                                          outPutRule = checknumber20(itemSkinMole, faceArea);
                                          
                                          if(outPutRule <0)
                                          {
                                            outPutRule = checknumber19(itemSkinMole, faceArea);

                                          }
                                        }
                                       
                                      }
                                     
                                    }
                                  }
                                }
                              }

                            }
                        }
                    }
                        }
                    }
                }
            

             }
             var titlepa = '';
             var contentPa ='';
    
             
             if(outPutRule == 1)
             {
                titlepa =  'Nốt ruồi số 1';
                contentPa = 'Người sở hữu nốt ruồi ở vị trí này là người có số khắc cha mẹ, hay xảy ra mâu thuẫn, cuộc sống đều phải tự thân vận động mới có </strong></p></div>';
             }
            else if(outPutRule == 2)
             {
                titlepa =  'Nốt ruồi số 2';
                contentPa = 'Dễ gặt hái được nhiều thành công, nhưng không được lâu dài</br> Dễ vướng vào thị phi ';
             }
             else if(outPutRule == 3)
             {
                titlepa =  'Nốt ruồi số 3';
                contentPa = 'Nốt ruồi ở trên mặt tại vị trí này là người có số khắc cha mẹ từ nhỏ, không sống chung được với cha mẹ</br>Là người thích sống bình dự, luôn bằng lòng với cuộc sống ';
             }
             else if(outPutRule == 4)
             {
                titlepa =  'Nốt ruồi số 4';
                contentPa = 'Được hưởng cuộc sống hạnh phúc, đầy đủ<br> Có số giàu sang <br>Gặp được quý nhân giúp đỡ khi gặp khó khăn';
             }
             else if(outPutRule == 5)
             {
                titlepa =  'Nốt ruồi số 5';
                contentPa = 'Là người có tấm lòng từ bi, nhân hậu</br>Người sở hữu nốt ruồi trên mặt tại vị trí này công việc làm ăn luôn gặp nhiều thuận lợi, được quý nhân giúp đỡ</br>Là người có địa vị trọng xã hội, được mọi người kính trọng';
             }
             else if(outPutRule == 6)
             {
                titlepa =  'Nốt ruồi số 6';
                contentPa = 'Đây là nốt ruồi không tốt, hay gặp phải thị phi, tai tiếng';
             }

             else if(outPutRule == 7)
             {
                titlepa =  'Nốt ruồi số 7';
                contentPa = 'Thường xuyên phải đi làm xa gia đình</br> Sức khỏe không được tốt </br> Gia đình hay xảy ra nhiều mâu thuẫn, cãi vã</br> Nên cẩn trọng trong việc làm ăn, kinh doanh';
             }
             else if(outPutRule == 71)
             {
                titlepa =  'Nốt ruồi số 7';
                contentPa = 'Giải mã nốt ruồi ở mặt xét thấy đây là người đa tài, am hiểu nhiều lĩnh vực khác nhau</br>Nhưng, gặp nhiều khó khăn trong công việc, nếu kiên trì sẽ vượt qua tất cả';
             }
             else if(outPutRule == 81)
             {
                titlepa =  'Nốt ruồi số 8';
                contentPa = 'Công danh, tiền tài đều rất tốt</br>Là người nhanh nhạy, thông minh</br>Chú ý nhiều hơn đến sức khỏe, tránh các bệnh về đường hô hấp';
             }
             else if(outPutRule == 9)
             {
                titlepa =  'Nốt ruồi số 9';
                contentPa = 'Là người sống bôn ba, tha hương</br> Sẽ có cuộc sống đầy đủ, sung túc</br>Dù Gặp nhiều khó khăn trong cuộc sống, nếu quyết tâm vượt qua, sẽ có được kết quả tốt';
             }

             else if(outPutRule == 10)
             {
                titlepa =  'Nốt ruồi số 10';
                contentPa = 'Đây là vị trí nốt ruồi trên khuôn mặt phú quý, có được nhiều thành tựu nhờ sự nỗ lực của bản thân</br>Xem nốt ruồi ở trên mặt cho biết đây là người am hiểu, hiểu biết sâu rộng';
             }

             else if(outPutRule == 11)
             {
                titlepa =  'Nốt ruồi số 11';
                contentPa = 'Dễ gặp được người tài giỏi, có quyền chức cao</br>Gặp nhiều bất lợi trong cuộc sống</br>Coi nốt ruồi trên mặt cho hay đây là vị trí nốt ruồi tốt, mang lại nhiều tài lộc';
             }

             else if(outPutRule == 12)
             {
                titlepa =  'Nốt ruồi số 12';
                contentPa = 'Làm ăn kinh doanh nên cẩn trọng, tránh thua lỗ</br>có sức đề kháng kém';
             }

             else if(outPutRule == 13)
             {
                titlepa =  'Nốt ruồi số 13';
                contentPa = 'Làm ăn xa sẽ rất dễ thành công<br>Nhưng, Vợ chồng hay xảy ra mâu thuẫn ';
             }

             else if(outPutRule == 131)
             {
                titlepa =  'Nốt ruồi số 13';
                contentPa = 'Người có nốt ruồi ở vị trí này là người biết lắng nghe, ngoan ngoãn, hiền lành</br>Nhưng Chuyện tình duyên hay lận đận';
             }
             else if(outPutRule == 14)
             {
                titlepa =  'Nốt ruồi số 14';
                contentPa = 'Hay can thiệp vào chuyện của người khác</br>Gặp nhiều chuyện bất lợi đưa tới';
             }
             else if(outPutRule == 15)
             {
                titlepa =  'Nốt ruồi số 15';
                contentPa = 'Là người hay nóng giận, khó kiềm chế cảm xúc';
             }

             else if(outPutRule == 16)
             {
                titlepa =  'Nốt ruồi số 16';
                contentPa = 'Thường suy nghĩ nông nổi';
             }
             else if(outPutRule == 17)
             {
                titlepa =  'Nốt ruồi số 17';
                contentPa = 'Là người có tham vọng lớn';
             }
             else if(outPutRule == 18)
             {
                titlepa =  'Nốt ruồi số 18';
                contentPa = 'Là người tốt bụng, hay giúp đỡ người khác<br/>Hay giúp đỡ mọi người xung quanh, có tấm lòng nhân hậu</br>Nhưng Đường con cái không được mấy thuận lợi, gặp nhiều khó khăn ';
             }
             else if(outPutRule == 19)
             {
                titlepa =  'Nốt ruồi số 19';
                contentPa = 'Là người có ý chí, khát vọng lớn <br/>Nhưng Thường suy nghĩ nông nổi ';
             }
             else if(outPutRule == 20)
             {
                titlepa =  'Nốt ruồi số 20';
                contentPa = 'Có  nhiều cơ hội thăng tiến trong sự nghiệp </br>Là người thông minh, nhanh nhạy</br>Nhưng thường dễ nản lòng khi gặp khó khăn</br>Là người không chịu được nhiều áp lực, đặc biệt là trong công việc</br>Là người sống tình cảm, lãng mạn</br> ';
             }

             else if(outPutRule == 23)
             {
                titlepa =  'Nốt ruồi số 23';
                contentPa = 'Hay xảy ra xung khắc với cha, phải lập nghiệp xa quê mới có được thành tựu </br> Là người tự lập, tự chủ về tài chính, biết cách quản lý chi tiêu';
             }
             else if(outPutRule == 24)
             {
                titlepa =  'Nốt ruồi số 24';
                contentPa = 'Gặp được nhiều may mắn </br> Cuộc sống hạnh phúc, không phải lo nghĩ về tiền bạc </br> Nốt ruồi trên mặt ở vị trí 37 cho biết bạn là người hay nổi nóng, không kiềm chế được bản thân  ';
             }

             else if(outPutRule == 21)
             {
                titlepa =  'Nốt ruồi số 21';
                contentPa = 'Hay vướng vào các chuyện thị phi không đáng có </br> Chú ý đến việc đi lại, nên cẩn trọng';
             }
             else if(outPutRule == 22)
             {
                titlepa =  'Nốt ruồi số 22';
                contentPa = 'Là một người rất chung thủy, yêu thương gia đình</br> Nhưng hay nóng giận, khó kiềm chế cảm xúc ';
             }

             if(titlepa != '')
             {
              var template = '<div class="center-div"> \
              <p class="title-description-content">' +titlepa  +' </p>\
              <p class="content-paragraph">Nội dung: </br> <strong>'+contentPa+' </strong></p></div>';
 
              htmlElement2 += template;
             }
            
          
            
          });
          
          setTimeout(() => {
            console.log(htmlElement2);

             document.getElementById("xemtuongResult").innerHTML += htmlElement2;
          }, 200);
      //   $("#xemtuongResult").html(htmlElement2);
       
          
});

function checknumber12(skinMole,faceArea )
{
    console.log("1",skinMole);
    console.log("2",faceArea);


  var isConditionX = (faceArea.left + ratex*2.2 <= skinMole.left
      &&  skinMole.left <= faceArea.left + ratex*3 );
    
      if( isConditionX ==false)
  {
      return -1;
  }
  


  var isConditionY = (faceArea.top -ratey   <= skinMole.top
                      && skinMole.top  <= faceArea.top +  ratey/3 );
 
            
  if( isConditionY ==false)
  {
      return -1;
  }

  if(skinMole.top <= faceArea.top -ratey/2.2 )
  {
      return 1;
  }
  else if(skinMole.top <= faceArea.top )
  {
  
    
     return  2;
  }
  else 
  {
   
     return 2;

  }


}

function checknumber34(skinMole,faceArea )
{

  var isConditionY = (faceArea.top -ratey   <= skinMole.top  &&  skinMole.top  <= faceArea.top-ratey/4 );
  
  if( isConditionY ==false)
  {
    return -1;
  }
  

  var isConditionX = (faceArea.left +ratex*5/2 <= skinMole.left
  && skinMole.left <= faceArea.left +ratex*5  );

  if( isConditionX ==false)
  {
      return -1;
  }
      //2,4
  if(skinMole.left <= faceArea.left +ratex*3.65 )
  {
      return 3;
  }
   //6,8,10
  else 
  {
      return 4;


  }
  return false;
}

function checknumber56(skinMole,faceArea )
{
  
var isConditionY = (faceArea.top -ratey   <= skinMole.top 
&& skinMole.top  <= faceArea.top-ratey/6 );

if( isConditionY ==false)
{
return -1;
}
var isConditionX = (skinMole.left   <= faceArea.left + ratex + ratex/3 );

if( isConditionX ==true)
{
    return 6 ;
}

else return 5;
  
 
}
//check
function checknumber78(skinMole,faceArea )
{
    var isConditionY = (faceArea.top <= skinMole.top 
        && skinMole.top  <= faceArea.top + ratey/2*0.9 );
    

        if( isConditionY ==false)
    {
        return -1;
    }
    
  
  if(skinMole.left <= faceArea.left +ratex*1.1 )
  {
    return 8;
  }
  else if( skinMole.left <= faceArea.left +ratex*2.1   )
  {
    return 7;
  }
   return -1;

 
}

//check
function checknumber78dowm(skinMole,faceArea )
{
    var isConditionY = (faceArea.top + ratey/2*0.9  < skinMole.top 
     && skinMole.top  <=  faceArea.top + ratey/2*0.9 + ratey/3);
    if( isConditionY ==false)
    {
        return -1;
    }

    
  
  if(skinMole.left <= faceArea.left +ratex*1.3 )
  {
    return 81;
  }
  else if( skinMole.left <= faceArea.left +ratex*2.1   )
  {
    return 71;
  }
   return -1;

 
}



function checknumber910(skinMole,faceArea )
{
    var isConditionY = (faceArea.top <= skinMole.top 
        && skinMole.top  <= faceArea.top + ratey/3 );
    

        if( isConditionY ==false)
    {
        return -1;
    }
    
    
  
  if(skinMole.left >= faceArea.left +ratex*3.7 )
  {
    return 10;
  }
  else if( skinMole.left >= faceArea.left +ratex*3 )
  {
    return 9;
  }
   return -1;

 
}

function checknumber1112dowm(skinMole,faceArea )
{
    
    
    var isConditionY = (faceArea.top + ratey/3  < skinMole.top 
     && skinMole.top  <=  faceArea.top + ratey/2*0.9 + ratey/3);
   
     if( isConditionY ==false)
    {
        return -1;
    }
   
    
  
    if(skinMole.left >= faceArea.left +ratex*3.7 )
    {
      return 12;
    }
    else if( skinMole.left >= faceArea.left +ratex*3 )
    {
      return 11;
    }
     return -1;
 

 
}


function checknumber13(skinMole,faceArea )
{
    var isConditionx = (faceArea.left + ratex*2.2   < skinMole.left
        && skinMole.left <= faceArea.left +ratex*3);
    if(isConditionx ==false)
    {
        return -1;
    }

    
    if(faceArea.top < skinMole.top  &&  skinMole.top <= faceArea.top+ ratey/2+ ratey/6)
    { 
     
  
        return 13;
    }
    else if( skinMole.top < faceArea.top +ratey + ratey/6)
    {  
        return 131;
    }
     return -1;
 

 
}



function checknumber1415(skinMole,faceArea )
{

    var isConditionx = (faceArea.left + ratex*2   < skinMole.left
        && skinMole.left <= faceArea.left +ratex*3-ratex/3);
       
  
    if(isConditionx ==true)
    {
    
      if(skinMole.top <= faceArea.top+ ratey*3/2 &&  skinMole.top >  faceArea.top +ratey*3/2 - ratey/2  )
      { 
        return 14;
      }
      else 
      {
        return -1;
      }
    }
    else 
    {

    
      isConditionx = (faceArea.left + ratex*2 -ratex/2  < skinMole.left
        && skinMole.left <= faceArea.left +ratex*2.5);
        
        if(isConditionx)
        {
          if(skinMole.top <= faceArea.top + ratey + ratey/3   &&  skinMole.top >= faceArea.top + ratey +ratey/6  )
          {
            return  15;
          }
          
        }
    
    }

  
     return -1;
 

 
}
function checknumber1617(skinMole,faceArea )
{
    return -1;
   var isConditionx = (faceArea.left + ratex*2   < skinMole.left
        && skinMole.left <= faceArea.left +ratex*3-ratex/2-ratex/7 );
       
  
    if(isConditionx ==true)
    {
    
      if(  faceArea.top+ ratey*3/2 <= skinMole.top  &&  skinMole.top <=  faceArea.top +ratey*2 - ratey/6  )
      { 
        return 16;
      }
      else 
      {
        return -1;
      }
    }
    else 
    {

    
      isConditionx = (faceArea.left + ratex*3   < skinMole.left
        && skinMole.left <= faceArea.left +ratex*4+ratex/3);
        

        if(isConditionx)
        {
          if(skinMole.top <= faceArea.top + ratey + ratey/2   &&  skinMole.top >= faceArea.top + ratey + ratey/3  )
          {
            return  15;
          }
          
        }
    
    }

  
     return -1;
 

 
}



function checknumber2324(skinMole,faceArea )
{
    

   var isConditionx = (faceArea.left < skinMole.left &&  skinMole.left <= faceArea.left + ratex*1 + ratex/2 -ratex/6 );

       
  
    if(isConditionx ==true)
    {
    
      if( faceArea.top + ratey + ratey/6  <=  skinMole.top &&  faceArea.top + ratey +ratey/2-ratey/5  )
      { 
        return 24;
      }
      
    }
    isConditionx = (faceArea.left + ratex/3   < skinMole.left
      && skinMole.left <= faceArea.left + ratex*2 +ratex/6);
      

      if(isConditionx)
      {
        if( faceArea.top + ratey/2  <= skinMole.top 
        
        && skinMole.top  <= faceArea.top + ratey + ratey/6  )
        {
          return  23;
        }
        
      }

  
     return -1;
 

 
}

function checknumber2122(skinMole,faceArea )
{

   var isConditionx = (
     faceArea.left + ratex*2.7 + ratex/7 < skinMole.left 
      &&  skinMole.left<= faceArea.left + ratex*4.75 );
   if(isConditionx ==true)
    {
    
      if( faceArea.top + ratey + ratey/4 >=  skinMole.top &&
      skinMole.top >=  faceArea.top + ratey  -ratey/3  )
      { 
        return 21;
      }
      
    }
    isConditionx = ( 
    faceArea.left + ratex*2.9 + ratex/7 < skinMole.left 
    &&  skinMole.left<= faceArea.left + ratex*4.5
    );
      

      if(isConditionx)
      {
        if(  faceArea.top + ratey + ratey/2 +ratex/7  >=  skinMole.top &&
        skinMole.top >=  faceArea.top + ratey +ratey/4   )
        {
          return  22;
        }
        
      }

  
     return -1;
 

 
}

function checknumber18(skinMole,faceArea )
{
  
   var isConditionx = (
     faceArea.left + ratex*2.5 - ratex/7 < skinMole.left 
      &&  skinMole.left<= faceArea.left + ratex*2.5 +ratex/7 );
   if(isConditionx ==true)
    {
    
      if( faceArea.top + ratey + ratey/2 <=  skinMole.top &&
      skinMole.top <=  faceArea.top + ratey *1.82  )
      { 
        return 18;
      }
      
    }
   
     return -1;
 

 
}

function checknumber20(skinMole,faceArea )
{
  
   var isConditionx = (
     faceArea.left + ratex*2.5 + ratex/7 -1 < skinMole.left 
      &&  skinMole.left<= faceArea.left + ratex*4 -ratex/7 );
   if(isConditionx ==true)
    {
    
      if( faceArea.top + ratey + ratey/2- ratey/7.6 <=  skinMole.top &&
      skinMole.top <=  faceArea.top + ratey *1.7  )
      { 
        return 20;
      }
      
    }
   
     return -1;
 

 
}
function checknumber19(skinMole,faceArea )
{
   var isConditionx = (
     faceArea.left + ratex*2.5 - ratex/6 -1> skinMole.left 
      &&  skinMole.left<= faceArea.left + ratex*1.7 );
   if(isConditionx ==true)
    {
    
      if( faceArea.top + ratey + ratey/2- ratey/5 <=  skinMole.top &&
      skinMole.top <=  faceArea.top + ratey *2  )
      { 
        return 20;
      }
      
    }
   
     return -1;
 

 
}


