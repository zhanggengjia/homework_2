/*

** google api v4 json calling changing
** load spreadsheet url = "https://docs.google.com/spreadsheets/d/[!!SPREADSHEET_ID!!]/gviz/tq?tqx=out:json&gid=[!!!SPREADSHEET_TABID!!!!]",
** json obj use !!ajax!! will be better > in preload part

*/



var ssurl = 'https://docs.google.com/spreadsheets/d/1YKCuc5ujWwhWNSa6v98LoTTVDfXRg5g1d7PXHmbAtgg/gviz/tq?tqx=out:json&gid=0';
var sscons = [];

function preload(){
  // 取得 spreadsheet
  $.ajax({url: ssurl, type: 'GET', dataType: 'text'})
    .done((data)=> {
      // 去除多餘的表頭資料
      const r = data.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
      if (r && r.length == 2) {
        const obj = JSON.parse(r[1]);
        // obj 即為 spreadsheet 裡資料
        console.log(obj);
        
        // !!!!! APIV4 change json object order !!!!
        // obj.table.cols.c[n].label > 各欄位名
        // obj.table.rows.c[n].v > 各列名
        // 整理為一個json格式
        obj.table.rows.forEach((robj)=>{
          let roweach = {};
          obj.table.cols.forEach((l,i)=>{
            roweach[l.label]=robj.c[i].v;
          });
          sscons.push(roweach);
        });
      }
      console.log(sscons);
    });
}


let angle = 0;

function setup(){
  createCanvas(550, 550, WEBGL);
}

let scale = 2.5;

function draw() {
  background(220);
  
  rectMode(CENTER);
  rotateY(mouseX);
  translate(0, -160 ,0);
  
  
  
   sscons.forEach((o)=>{
     line(o.start_y*scale,o.start_z*scale, o.start_x*scale, o.end_y*scale, o.end_z*scale, o.end_x*scale);
   });
  
  
}


