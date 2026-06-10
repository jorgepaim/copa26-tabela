import { useState, useMemo } from "react";

// ── Bandeiras ─────────────────────────────────────────────────────────────
var CF = {
  MEX:"mx",RSA:"za",KOR:"kr",CZE:"cz",CAN:"ca",BIH:"ba",QAT:"qa",SUI:"ch",
  BRA:"br",MAR:"ma",HAI:"ht",SCO:"gb-sct",USA:"us",PAR:"py",AUS:"au",TUR:"tr",
  GER:"de",CUW:"cw",CIV:"ci",ECU:"ec",NED:"nl",JPN:"jp",SWE:"se",TUN:"tn",
  BEL:"be",EGY:"eg",IRN:"ir",NZL:"nz",ESP:"es",CPV:"cv",KSA:"sa",URU:"uy",
  FRA:"fr",SEN:"sn",IRQ:"iq",NOR:"no",ARG:"ar",ALG:"dz",AUT:"at",JOR:"jo",
  POR:"pt",COD:"cd",UZB:"uz",COL:"co",ENG:"gb-eng",CRO:"hr",GHA:"gh",PAN:"pa",
};
function flagUrl(c){ return "https://hatscripts.github.io/circle-flags/flags/"+c+".svg"; }
function FlagImg(props) {
  var tid=props.tid; var size=props.size||28; var sx=props.style||{};
  var es=useState(false); var setE=es[1]; var e=es[0]; var c=CF[tid];
  if(!c||e) return <img src={flagUrl(c||"gb")} width={size} height={size} alt={tid} style={Object.assign({borderRadius:"50%",objectFit:"cover",flexShrink:0},sx)}/>;
  return <img src={flagUrl(c)} width={size} height={size} alt={tid} onError={function(){setE(true);}} style={Object.assign({borderRadius:"50%",objectFit:"cover",flexShrink:0},sx)}/>;
}

// ── Selecoes ──────────────────────────────────────────────────────────────
var GROUPS={
  A:[
    {id:"MEX",name:"Mexico",         flag:"🇲🇽"},
    {id:"RSA",name:"Africa do Sul",  flag:"🇿🇦"},
    {id:"KOR",name:"Coreia do Sul",  flag:"🇰🇷"},
    {id:"CZE",name:"Rep. Tcheca",    flag:"🇨🇿"},
  ],
  B:[
    {id:"CAN",name:"Canada",         flag:"🇨🇦"},
    {id:"BIH",name:"Bosnia",         flag:"🇧🇦"},
    {id:"QAT",name:"Catar",          flag:"🇶🇦"},
    {id:"SUI",name:"Suica",          flag:"🇨🇭"},
  ],
  C:[
    {id:"BRA",name:"Brasil",         flag:"🇧🇷"},
    {id:"MAR",name:"Marrocos",       flag:"🇲🇦"},
    {id:"HAI",name:"Haiti",          flag:"🇭🇹"},
    {id:"SCO",name:"Escocia",        flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿"},
  ],
  D:[
    {id:"USA",name:"Estados Unidos", flag:"🇺🇸"},
    {id:"PAR",name:"Paraguai",       flag:"🇵🇾"},
    {id:"AUS",name:"Australia",      flag:"🇦🇺"},
    {id:"TUR",name:"Turquia",        flag:"🇹🇷"},
  ],
  E:[
    {id:"GER",name:"Alemanha",       flag:"🇩🇪"},
    {id:"CUW",name:"Curacao",        flag:"🇨🇼"},
    {id:"CIV",name:"Costa do Marfim",flag:"🇨🇮"},
    {id:"ECU",name:"Equador",        flag:"🇪🇨"},
  ],
  F:[
    {id:"NED",name:"Holanda",        flag:"🇳🇱"},
    {id:"JPN",name:"Japao",          flag:"🇯🇵"},
    {id:"SWE",name:"Suecia",         flag:"🇸🇪"},
    {id:"TUN",name:"Tunisia",        flag:"🇹🇳"},
  ],
  G:[
    {id:"BEL",name:"Belgica",        flag:"🇧🇪"},
    {id:"EGY",name:"Egito",          flag:"🇪🇬"},
    {id:"IRN",name:"Ira",            flag:"🇮🇷"},
    {id:"NZL",name:"Nova Zelandia",  flag:"🇳🇿"},
  ],
  H:[
    {id:"ESP",name:"Espanha",        flag:"🇪🇸"},
    {id:"CPV",name:"Cabo Verde",     flag:"🇨🇻"},
    {id:"KSA",name:"Arabia Saudita", flag:"🇸🇦"},
    {id:"URU",name:"Uruguai",        flag:"🇺🇾"},
  ],
  I:[
    {id:"FRA",name:"Franca",         flag:"🇫🇷"},
    {id:"SEN",name:"Senegal",        flag:"🇸🇳"},
    {id:"IRQ",name:"Iraque",         flag:"🇮🇶"},
    {id:"NOR",name:"Noruega",        flag:"🇳🇴"},
  ],
  J:[
    {id:"ARG",name:"Argentina",      flag:"🇦🇷"},
    {id:"ALG",name:"Algeria",        flag:"🇩🇿"},
    {id:"AUT",name:"Austria",        flag:"🇦🇹"},
    {id:"JOR",name:"Jordania",       flag:"🇯🇴"},
  ],
  K:[
    {id:"POR",name:"Portugal",       flag:"🇵🇹"},
    {id:"COD",name:"RD Congo",       flag:"🇨🇩"},
    {id:"UZB",name:"Uzbequistao",    flag:"🇺🇿"},
    {id:"COL",name:"Colombia",       flag:"🇨🇴"},
  ],
  L:[
    {id:"ENG",name:"Inglaterra",     flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿"},
    {id:"CRO",name:"Croacia",        flag:"🇭🇷"},
    {id:"GHA",name:"Gana",           flag:"🇬🇭"},
    {id:"PAN",name:"Panama",         flag:"🇵🇦"},
  ],
};

var GROUP_KEYS=Object.keys(GROUPS);
var ALL_TEAMS=[];
GROUP_KEYS.forEach(function(g){ GROUPS[g].forEach(function(t){ ALL_TEAMS.push(t); }); });
var GROUPS_FLAT={};
ALL_TEAMS.forEach(function(t){ GROUPS_FLAT[t.id]=t; });

// ── Jogos ──────────────────────────────────────────────────────────────────
var MATCHES=[
  {id:"m1",  grp:"A",date:"11/06",time:"16h",home:"MEX",away:"RSA",venue:"Azteca, Mexico"},
  {id:"m2",  grp:"A",date:"11/06",time:"23h",home:"KOR",away:"CZE",venue:"Akron, Guadalajara"},
  {id:"m3",  grp:"B",date:"12/06",time:"16h",home:"CAN",away:"BIH",venue:"BMO, Toronto"},
  {id:"m4",  grp:"D",date:"12/06",time:"22h",home:"USA",away:"PAR",venue:"SoFi, Los Angeles"},
  {id:"m5",  grp:"B",date:"13/06",time:"16h",home:"QAT",away:"SUI",venue:"Levis, San Francisco"},
  {id:"m6",  grp:"C",date:"13/06",time:"19h",home:"BRA",away:"MAR",venue:"MetLife, Nova Jersey"},
  {id:"m7",  grp:"C",date:"13/06",time:"22h",home:"HAI",away:"SCO",venue:"Gillette, Boston"},
  {id:"m8",  grp:"D",date:"14/06",time:"01h",home:"AUS",away:"TUR",venue:"BC Place, Vancouver"},
  {id:"m9",  grp:"E",date:"14/06",time:"14h",home:"GER",away:"CUW",venue:"NRG, Houston"},
  {id:"m10", grp:"F",date:"14/06",time:"17h",home:"NED",away:"JPN",venue:"ATT, Dallas"},
  {id:"m11", grp:"E",date:"14/06",time:"20h",home:"CIV",away:"ECU",venue:"Lincoln, Philadelphia"},
  {id:"m12", grp:"F",date:"14/06",time:"23h",home:"SWE",away:"TUN",venue:"BBVA, Monterrey"},
  {id:"m13", grp:"H",date:"15/06",time:"13h",home:"ESP",away:"CPV",venue:"Mercedes-Benz, Atlanta"},
  {id:"m14", grp:"G",date:"15/06",time:"16h",home:"BEL",away:"EGY",venue:"Lumen, Seattle"},
  {id:"m15", grp:"H",date:"15/06",time:"19h",home:"KSA",away:"URU",venue:"Hard Rock, Miami"},
  {id:"m16", grp:"G",date:"15/06",time:"22h",home:"IRN",away:"NZL",venue:"SoFi, Los Angeles"},
  {id:"m17", grp:"I",date:"16/06",time:"16h",home:"FRA",away:"SEN",venue:"MetLife, Nova Jersey"},
  {id:"m18", grp:"I",date:"16/06",time:"19h",home:"IRQ",away:"NOR",venue:"Gillette, Boston"},
  {id:"m19", grp:"J",date:"16/06",time:"22h",home:"ARG",away:"ALG",venue:"Arrowhead, Kansas City"},
  {id:"m20", grp:"J",date:"17/06",time:"01h",home:"AUT",away:"JOR",venue:"Levis, San Francisco"},
  {id:"m21", grp:"K",date:"17/06",time:"14h",home:"POR",away:"COD",venue:"NRG, Houston"},
  {id:"m22", grp:"L",date:"17/06",time:"17h",home:"ENG",away:"CRO",venue:"ATT, Dallas"},
  {id:"m23", grp:"L",date:"17/06",time:"20h",home:"GHA",away:"PAN",venue:"BMO, Toronto"},
  {id:"m24", grp:"K",date:"17/06",time:"23h",home:"UZB",away:"COL",venue:"Azteca, Mexico"},
  {id:"m25", grp:"A",date:"18/06",time:"13h",home:"CZE",away:"RSA",venue:"Mercedes-Benz, Atlanta"},
  {id:"m26", grp:"B",date:"18/06",time:"16h",home:"SUI",away:"BIH",venue:"SoFi, Los Angeles"},
  {id:"m27", grp:"B",date:"18/06",time:"19h",home:"CAN",away:"QAT",venue:"BC Place, Vancouver"},
  {id:"m28", grp:"A",date:"18/06",time:"22h",home:"MEX",away:"KOR",venue:"Akron, Guadalajara"},
  {id:"m29", grp:"D",date:"19/06",time:"16h",home:"USA",away:"AUS",venue:"Lumen, Seattle"},
  {id:"m30", grp:"C",date:"19/06",time:"19h",home:"SCO",away:"MAR",venue:"Gillette, Boston"},
  {id:"m31", grp:"C",date:"19/06",time:"21h",home:"BRA",away:"HAI",venue:"Lincoln, Philadelphia"},
  {id:"m32", grp:"D",date:"19/06",time:"22h",home:"PAR",away:"TUR",venue:"Hard Rock, Miami"},
  {id:"m33", grp:"E",date:"20/06",time:"17h",home:"GER",away:"CIV",venue:"ATT, Dallas"},
  {id:"m34", grp:"F",date:"20/06",time:"20h",home:"NED",away:"SWE",venue:"MetLife, Nova Jersey"},
  {id:"m35", grp:"F",date:"20/06",time:"20h",home:"JPN",away:"TUN",venue:"Arrowhead, Kansas City"},
  {id:"m36", grp:"E",date:"20/06",time:"23h",home:"ECU",away:"CUW",venue:"NRG, Houston"},
  {id:"m37", grp:"G",date:"21/06",time:"16h",home:"BEL",away:"IRN",venue:"Lumen, Seattle"},
  {id:"m38", grp:"H",date:"21/06",time:"19h",home:"ESP",away:"KSA",venue:"Hard Rock, Miami"},
  {id:"m39", grp:"G",date:"21/06",time:"19h",home:"EGY",away:"NZL",venue:"Mercedes-Benz, Atlanta"},
  {id:"m40", grp:"H",date:"21/06",time:"22h",home:"CPV",away:"URU",venue:"ATT, Dallas"},
  {id:"m41", grp:"I",date:"22/06",time:"16h",home:"FRA",away:"IRQ",venue:"SoFi, Los Angeles"},
  {id:"m42", grp:"I",date:"22/06",time:"19h",home:"SEN",away:"NOR",venue:"Gillette, Boston"},
  {id:"m43", grp:"J",date:"22/06",time:"22h",home:"ARG",away:"AUT",venue:"MetLife, Nova Jersey"},
  {id:"m44", grp:"J",date:"22/06",time:"22h",home:"ALG",away:"JOR",venue:"Arrowhead, Kansas City"},
  {id:"m45", grp:"K",date:"23/06",time:"16h",home:"POR",away:"UZB",venue:"BC Place, Vancouver"},
  {id:"m46", grp:"L",date:"23/06",time:"19h",home:"ENG",away:"GHA",venue:"NRG, Houston"},
  {id:"m47", grp:"K",date:"23/06",time:"22h",home:"COD",away:"COL",venue:"Levis, San Francisco"},
  {id:"m48", grp:"L",date:"23/06",time:"22h",home:"CRO",away:"PAN",venue:"BMO, Toronto"},
  {id:"m49", grp:"A",date:"24/06",time:"16h",home:"RSA",away:"KOR",venue:"Azteca, Mexico"},
  {id:"m50", grp:"A",date:"24/06",time:"16h",home:"MEX",away:"CZE",venue:"Akron, Guadalajara"},
  {id:"m51", grp:"B",date:"24/06",time:"20h",home:"BIH",away:"QAT",venue:"Mercedes-Benz, Atlanta"},
  {id:"m52", grp:"B",date:"24/06",time:"20h",home:"SUI",away:"CAN",venue:"Lumen, Seattle"},
  {id:"m53", grp:"C",date:"25/06",time:"16h",home:"MAR",away:"HAI",venue:"Lincoln, Philadelphia"},
  {id:"m54", grp:"C",date:"25/06",time:"16h",home:"SCO",away:"BRA",venue:"Gillette, Boston"},
  {id:"m55", grp:"D",date:"25/06",time:"20h",home:"PAR",away:"AUS",venue:"Hard Rock, Miami"},
  {id:"m56", grp:"D",date:"25/06",time:"20h",home:"TUR",away:"USA",venue:"ATT, Dallas"},
  {id:"m57", grp:"E",date:"26/06",time:"16h",home:"CUW",away:"GER",venue:"NRG, Houston"},
  {id:"m58", grp:"E",date:"26/06",time:"16h",home:"ECU",away:"CIV",venue:"Mercedes-Benz, Atlanta"},
  {id:"m59", grp:"F",date:"26/06",time:"20h",home:"TUN",away:"NED",venue:"MetLife, Nova Jersey"},
  {id:"m60", grp:"F",date:"26/06",time:"20h",home:"SWE",away:"JPN",venue:"SoFi, Los Angeles"},
  {id:"m61", grp:"G",date:"27/06",time:"16h",home:"NZL",away:"BEL",venue:"Lumen, Seattle"},
  {id:"m62", grp:"H",date:"27/06",time:"16h",home:"URU",away:"ESP",venue:"Hard Rock, Miami"},
  {id:"m63", grp:"G",date:"27/06",time:"20h",home:"EGY",away:"IRN",venue:"BC Place, Vancouver"},
  {id:"m64", grp:"H",date:"27/06",time:"20h",home:"KSA",away:"CPV",venue:"Arrowhead, Kansas City"},
  {id:"m65", grp:"I",date:"28/06",time:"16h",home:"NOR",away:"FRA",venue:"ATT, Dallas"},
  {id:"m66", grp:"I",date:"28/06",time:"16h",home:"IRQ",away:"SEN",venue:"Gillette, Boston"},
  {id:"m67", grp:"J",date:"28/06",time:"20h",home:"AUT",away:"ARG",venue:"MetLife, Nova Jersey"},
  {id:"m68", grp:"J",date:"28/06",time:"20h",home:"JOR",away:"ALG",venue:"Levis, San Francisco"},
  {id:"m69", grp:"K",date:"29/06",time:"16h",home:"COL",away:"POR",venue:"NRG, Houston"},
  {id:"m70", grp:"K",date:"29/06",time:"16h",home:"UZB",away:"COD",venue:"SoFi, Los Angeles"},
  {id:"m71", grp:"L",date:"29/06",time:"20h",home:"CRO",away:"ENG",venue:"ATT, Dallas"},
  {id:"m72", grp:"L",date:"29/06",time:"20h",home:"PAN",away:"GHA",venue:"BMO, Toronto"},
];

// ── Storage ────────────────────────────────────────────────────────────────
function loadScores(){try{return JSON.parse(localStorage.getItem("tabela26_sc")||"{}");}catch{return {};}}
function loadGrp(){try{return localStorage.getItem("tabela26_grp")||"A";}catch{return "A";}}

// ── Classificação ──────────────────────────────────────────────────────────
function calcStandings(grpId, sc){
  var grpTeams=GROUPS[grpId];
  var grpIds=grpTeams.map(function(t){return t.id;});
  var grpMatches=MATCHES.filter(function(m){return grpIds.indexOf(m.home)>=0 && grpIds.indexOf(m.away)>=0;});
  var st={};
  grpTeams.forEach(function(t){st[t.id]={id:t.id,pts:0,pj:0,v:0,e:0,d:0,gp:0,gc:0,sg:0};});
  grpMatches.forEach(function(m){
    var hs=parseInt(sc[m.id+"_h"]); var aw=parseInt(sc[m.id+"_a"]);
    if(isNaN(hs)||isNaN(aw)) return;
    st[m.home].pj++; st[m.away].pj++;
    st[m.home].gp+=hs; st[m.home].gc+=aw; st[m.home].sg+=hs-aw;
    st[m.away].gp+=aw; st[m.away].gc+=hs; st[m.away].sg+=aw-hs;
    if(hs>aw){st[m.home].v++;st[m.home].pts+=3;st[m.away].d++;}
    else if(hs<aw){st[m.away].v++;st[m.away].pts+=3;st[m.home].d++;}
    else{st[m.home].e++;st[m.home].pts+=1;st[m.away].e++;st[m.away].pts+=1;}
  });
  return Object.values(st).sort(function(a,b){
    if(b.pts!==a.pts) return b.pts-a.pts;
    if(b.sg!==a.sg) return b.sg-a.sg;
    if(b.gp!==a.gp) return b.gp-a.gp;
    return a.id.localeCompare(b.id);
  });
}

// ── Fase eliminatória (mata-mata) ──────────────────────────────────────────
// Regras FIFA Copa 2026: 12 grupos de 4 seleções → os 2 primeiros de cada
// grupo (24) mais os 8 melhores terceiros colocados avançam para a fase de
// 32. Critérios de desempate entre os terceiros: pontos, saldo de gols,
// gols pró e, por fim, ordem do grupo (A→L) como desempate determinístico.
// A chave é recalculada a cada placar inserido — uma projeção ao vivo da
// classificação, não o sorteio oficial da FIFA (que define os confrontos
// antes do início do torneio).
var PHASES=[
  {key:"grupos",   label:"Grupos",   start:"11/06",end:"29/06"},
  {key:"qualified",label:"Classif."},
  {key:"r32",      label:"R/32",     start:"30/06",end:"03/07"},
  {key:"r16",      label:"Oitavas",  start:"04/07",end:"07/07"},
  {key:"qf",       label:"Quartas",  start:"09/07",end:"10/07"},
  {key:"sf",       label:"Semi",     start:"14/07",end:"15/07"},
  {key:"3rd",      label:"3º Lugar", start:"18/07",end:"18/07"},
  {key:"final",    label:"Final",    start:"19/07",end:"19/07"}
];
function parsePhaseDate(d){ var p=d.split("/"); return new Date(2026,parseInt(p[1],10)-1,parseInt(p[0],10)); }
function currentPhaseKey(){
  var today=new Date(); today.setHours(0,0,0,0);
  var dated=PHASES.filter(function(p){return p.start;});
  for(var i=0;i<dated.length;i++){ if(parsePhaseDate(dated[i].end)>=today) return dated[i].key; }
  return dated[dated.length-1].key;
}
function calcQualified(sc){
  var winners=[],runnersup=[],thirds=[];
  GROUP_KEYS.forEach(function(g){
    var rows=calcStandings(g,sc);
    winners.push({grp:g,pos:1,row:rows[0]});
    runnersup.push({grp:g,pos:2,row:rows[1]});
    thirds.push({grp:g,pos:3,row:rows[2]});
  });
  function cmp(a,b){
    if(b.row.pts!==a.row.pts) return b.row.pts-a.row.pts;
    if(b.row.sg!==a.row.sg) return b.row.sg-a.row.sg;
    if(b.row.gp!==a.row.gp) return b.row.gp-a.row.gp;
    return a.grp.localeCompare(b.grp);
  }
  winners.sort(cmp); runnersup.sort(cmp);
  var rankedThirds=thirds.slice().sort(cmp);
  var bestThirds=rankedThirds.slice(0,8);
  return {winners:winners,runnersup:runnersup,rankedThirds:rankedThirds,bestThirds:bestThirds,qualified:winners.concat(runnersup).concat(bestThirds)};
}
// Resolve vencedor/perdedor de um confronto eliminatorio (com penaltis em
// caso de empate). Sem placar definido, projeta o time mais bem ranqueado
// (mandante do confronto, pelo seeding) como "vencedor" provisorio, para que
// a chave fique sempre completa — marcado como projecao na interface.
function koResolve(m,sc){
  var hs=parseInt(sc[m.id+"_h"]); var aw=parseInt(sc[m.id+"_a"]);
  if(!isNaN(hs)&&!isNaN(aw)){
    if(hs>aw) return {winner:m.home,loser:m.away,projected:false};
    if(hs<aw) return {winner:m.away,loser:m.home,projected:false};
    var ph=parseInt(sc[m.id+"_ph"]); var pa=parseInt(sc[m.id+"_pa"]);
    if(!isNaN(ph)&&!isNaN(pa)&&ph!==pa) return ph>pa?{winner:m.home,loser:m.away,projected:false}:{winner:m.away,loser:m.home,projected:false};
  }
  return {winner:m.home,loser:m.away,projected:true};
}
// Datas, horários e locais (aproximados, calendário oficial FIFA Copa 2026)
var R32_INFO=[
  {date:"30/06",time:"13h",venue:"Azteca, Mexico"},
  {date:"30/06",time:"16h",venue:"SoFi, Los Angeles"},
  {date:"30/06",time:"19h",venue:"MetLife, Nova Jersey"},
  {date:"30/06",time:"22h",venue:"ATT, Dallas"},
  {date:"01/07",time:"13h",venue:"Akron, Guadalajara"},
  {date:"01/07",time:"16h",venue:"Lumen, Seattle"},
  {date:"01/07",time:"19h",venue:"NRG, Houston"},
  {date:"01/07",time:"22h",venue:"Hard Rock, Miami"},
  {date:"02/07",time:"13h",venue:"BMO, Toronto"},
  {date:"02/07",time:"16h",venue:"BC Place, Vancouver"},
  {date:"02/07",time:"19h",venue:"Mercedes-Benz, Atlanta"},
  {date:"02/07",time:"22h",venue:"Levis, San Francisco"},
  {date:"03/07",time:"13h",venue:"Arrowhead, Kansas City"},
  {date:"03/07",time:"16h",venue:"Gillette, Boston"},
  {date:"03/07",time:"19h",venue:"Lincoln, Philadelphia"},
  {date:"03/07",time:"22h",venue:"Akron, Guadalajara"}
];
var R16_INFO=[
  {date:"04/07",time:"13h",venue:"MetLife, Nova Jersey"},
  {date:"04/07",time:"17h",venue:"SoFi, Los Angeles"},
  {date:"05/07",time:"13h",venue:"Azteca, Mexico"},
  {date:"05/07",time:"17h",venue:"ATT, Dallas"},
  {date:"06/07",time:"13h",venue:"Lumen, Seattle"},
  {date:"06/07",time:"17h",venue:"Hard Rock, Miami"},
  {date:"07/07",time:"13h",venue:"Mercedes-Benz, Atlanta"},
  {date:"07/07",time:"17h",venue:"NRG, Houston"}
];
var QF_INFO=[
  {date:"09/07",time:"16h",venue:"MetLife, Nova Jersey"},
  {date:"09/07",time:"20h",venue:"SoFi, Los Angeles"},
  {date:"10/07",time:"16h",venue:"ATT, Dallas"},
  {date:"10/07",time:"20h",venue:"Azteca, Mexico"}
];
var SF_INFO=[
  {date:"14/07",time:"19h",venue:"ATT, Dallas"},
  {date:"15/07",time:"19h",venue:"MetLife, Nova Jersey"}
];
var THIRD_INFO={date:"18/07",time:"16h",venue:"Hard Rock, Miami"};
var FINAL_INFO={date:"19/07",time:"16h",venue:"MetLife, Nova Jersey"};
function buildKnockout(sc){
  var q=calcQualified(sc);
  var seeds=q.qualified;
  function lbl(s){return (s.pos===1?"1º":s.pos===2?"2º":"3º")+" Grupo "+s.grp;}
  var r32=[];
  for(var i=0;i<16;i++){
    var hs=seeds[i],as=seeds[31-i]; var info=R32_INFO[i];
    r32.push({id:"ko32_"+(i+1),home:hs.row.id,away:as.row.id,homeSeed:lbl(hs),awaySeed:lbl(as),homeProjected:false,awayProjected:false,date:info.date,time:info.time,venue:info.venue});
  }
  function next(prev,key,infoArr){
    var out=[];
    for(var i=0;i<prev.length;i+=2){
      var r1=koResolve(prev[i],sc),r2=koResolve(prev[i+1],sc); var inf=infoArr[out.length];
      out.push({id:key+"_"+(out.length+1),home:r1.winner,away:r2.winner,homeProjected:r1.projected,awayProjected:r2.projected,date:inf.date,time:inf.time,venue:inf.venue});
    }
    return out;
  }
  var r16=next(r32,"ko16",R16_INFO);
  var qf=next(r16,"koqf",QF_INFO);
  var sf=next(qf,"kosf",SF_INFO);
  var rsf1=koResolve(sf[0],sc),rsf2=koResolve(sf[1],sc);
  var third={id:"ko3rd",home:rsf1.loser,away:rsf2.loser,homeProjected:rsf1.projected,awayProjected:rsf2.projected,date:THIRD_INFO.date,time:THIRD_INFO.time,venue:THIRD_INFO.venue};
  var final={id:"kofinal",home:rsf1.winner,away:rsf2.winner,homeProjected:rsf1.projected,awayProjected:rsf2.projected,date:FINAL_INFO.date,time:FINAL_INFO.time,venue:FINAL_INFO.venue};
  return {q:q,r32:r32,r16:r16,qf:qf,sf:sf,third:third,final:final};
}

// ── StandingsTable ───────────────────────────────────────────────────────────
function StandingsTable(props){
  var grpId=props.grpId; var sc=props.sc;
  var rows=calcStandings(grpId,sc);
  var bgRow=["#e8f5e9","#e3f2fd","#fff8e1","#fff"];
  return (
    <div style={{background:"#fff",borderRadius:12,overflow:"hidden",boxShadow:"0 1px 6px rgba(0,0,0,0.08)",marginBottom:8}}>
      <div style={{background:"#002776",padding:"6px 10px"}}>
        <span style={{color:"#ffdf00",fontWeight:900,fontSize:12}}>Classificacao Grupo {grpId}</span>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
          <thead>
            <tr style={{background:"#f0f4f8"}}>
              {["#","Selecao","PJ","V","E","D","GP","GC","SG","PTS"].map(function(h){
                return <th key={h} style={{padding:"4px 5px",textAlign:h==="Selecao"?"left":"center",fontWeight:700,color:"#002776",fontSize:10,whiteSpace:"nowrap"}}>{h}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map(function(r,i){
              var tm=GROUPS_FLAT[r.id];
              var bg=bgRow[Math.min(i,3)];
              return (
                <tr key={r.id} style={{background:bg,borderTop:"1px solid #e8edf5"}}>
                  <td style={{padding:"5px",textAlign:"center",fontWeight:800,color:i<2?"#002776":"#888"}}>{i+1}</td>
                  <td style={{padding:"5px",whiteSpace:"nowrap"}}>
                    <div style={{display:"flex",alignItems:"center",gap:4}}>
                      <FlagImg tid={r.id} size={14}/>
                      <span style={{fontWeight:700,fontSize:10}}>{tm?tm.name:r.id}</span>
                    </div>
                  </td>
                  <td style={{padding:"5px",textAlign:"center"}}>{r.pj}</td>
                  <td style={{padding:"5px",textAlign:"center"}}>{r.v}</td>
                  <td style={{padding:"5px",textAlign:"center"}}>{r.e}</td>
                  <td style={{padding:"5px",textAlign:"center"}}>{r.d}</td>
                  <td style={{padding:"5px",textAlign:"center"}}>{r.gp}</td>
                  <td style={{padding:"5px",textAlign:"center"}}>{r.gc}</td>
                  <td style={{padding:"5px",textAlign:"center"}}>{r.sg}</td>
                  <td style={{padding:"5px",textAlign:"center",fontWeight:900,color:i<2?"#002776":"#555",fontSize:12}}>{r.pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{padding:"3px 8px 4px",fontSize:9,color:"#aaa"}}>Verde=Classif. Azul=Poss.3o PTS=Pts SG=Saldo</div>
    </div>
  );
}

// ── MatchRow ────────────────────────────────────────────────────────────────
function MatchRow(p){
  var m=p.m; var showGrp=p.showGrp; var scores=p.scores; var onScoreChange=p.onScoreChange;
  var hs=scores[m.id+"_h"]||""; var aw=scores[m.id+"_a"]||"";
  var hT=GROUPS_FLAT[m.home]; var aT=GROUPS_FLAT[m.away];
  return (
    <div style={{background:"#fff",borderRadius:12,marginBottom:8,padding:"9px 11px",boxShadow:"0 1px 5px rgba(0,0,0,0.08)"}}>
      <div style={{fontSize:10,color:"#888",marginBottom:5,display:"flex",gap:8,flexWrap:"wrap"}}>
        {showGrp&&<span style={{fontWeight:700,color:"#002776",background:"#e8edf5",borderRadius:6,padding:"1px 6px"}}>Grp {m.grp}</span>}
        <span>Data: {m.date}</span>
        <span>Hora: {m.time} BRT</span>
        <span style={{flex:1,textAlign:"right",fontSize:9}}>Local: {m.venue}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:5}}>
        <div style={{flex:1,display:"flex",alignItems:"center",gap:5,justifyContent:"flex-end"}}>
          <span style={{fontSize:12,fontWeight:700,color:"#002776",textAlign:"right"}}>{hT?hT.name:m.home}</span>
          <FlagImg tid={m.home} size={20}/>
        </div>
        <input value={hs} onChange={function(e){onScoreChange(m.id,"h",e.target.value);}} maxLength={2} inputMode="numeric"
          style={{width:33,height:33,textAlign:"center",fontSize:16,fontWeight:900,borderRadius:8,border:"2px solid #dde3ee",outline:"none",color:"#002776",padding:0}}/>
        <span style={{fontWeight:900,fontSize:14,color:"#aaa"}}>x</span>
        <input value={aw} onChange={function(e){onScoreChange(m.id,"a",e.target.value);}} maxLength={2} inputMode="numeric"
          style={{width:33,height:33,textAlign:"center",fontSize:16,fontWeight:900,borderRadius:8,border:"2px solid #dde3ee",outline:"none",color:"#002776",padding:0}}/>
        <div style={{flex:1,display:"flex",alignItems:"center",gap:5}}>
          <FlagImg tid={m.away} size={20}/>
          <span style={{fontSize:12,fontWeight:700,color:"#002776"}}>{aT?aT.name:m.away}</span>
        </div>
      </div>
    </div>
  );
}

// ── KnockoutRow ─────────────────────────────────────────────────────────────
function KnockoutRow(p){
  var m=p.m; var scores=p.scores; var onScoreChange=p.onScoreChange;
  var hs=scores[m.id+"_h"]||""; var aw=scores[m.id+"_a"]||"";
  var ph=scores[m.id+"_ph"]||""; var pa=scores[m.id+"_pa"]||"";
  var hT=GROUPS_FLAT[m.home]; var aT=GROUPS_FLAT[m.away];
  var draw=hs!==""&&aw!==""&&parseInt(hs)===parseInt(aw);
  return (
    <div style={{background:"#fff",borderRadius:12,marginBottom:8,padding:"9px 11px",boxShadow:"0 1px 5px rgba(0,0,0,0.08)"}}>
      {m.date&&(
        <div style={{fontSize:10,color:"#888",marginBottom:5,display:"flex",gap:8,flexWrap:"wrap"}}>
          <span>Data: {m.date}</span>
          <span>Hora: {m.time} BRT</span>
          <span style={{flex:1,textAlign:"right",fontSize:9}}>Local: {m.venue}</span>
        </div>
      )}
      <div style={{display:"flex",alignItems:"center",gap:5}}>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:1}}>
          <div style={{display:"flex",alignItems:"center",gap:5}}>
            <span style={{fontSize:12,fontWeight:700,color:"#002776",textAlign:"right"}}>{hT?hT.name:m.home}</span>
            <FlagImg tid={m.home} size={20}/>
          </div>
          {m.homeSeed&&<span style={{fontSize:9,color:"#aaa"}}>{m.homeSeed}</span>}
          {m.homeProjected&&<span style={{fontSize:9,color:"#fb8c00",fontWeight:700}}>projeção</span>}
        </div>
        <input value={hs} onChange={function(e){onScoreChange(m.id,"h",e.target.value);}} maxLength={2} inputMode="numeric"
          style={{width:33,height:33,textAlign:"center",fontSize:16,fontWeight:900,borderRadius:8,border:"2px solid #dde3ee",outline:"none",color:"#002776",padding:0}}/>
        <span style={{fontWeight:900,fontSize:14,color:"#aaa"}}>x</span>
        <input value={aw} onChange={function(e){onScoreChange(m.id,"a",e.target.value);}} maxLength={2} inputMode="numeric"
          style={{width:33,height:33,textAlign:"center",fontSize:16,fontWeight:900,borderRadius:8,border:"2px solid #dde3ee",outline:"none",color:"#002776",padding:0}}/>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"flex-start",gap:1}}>
          <div style={{display:"flex",alignItems:"center",gap:5}}>
            <FlagImg tid={m.away} size={20}/>
            <span style={{fontSize:12,fontWeight:700,color:"#002776"}}>{aT?aT.name:m.away}</span>
          </div>
          {m.awaySeed&&<span style={{fontSize:9,color:"#aaa"}}>{m.awaySeed}</span>}
          {m.awayProjected&&<span style={{fontSize:9,color:"#fb8c00",fontWeight:700}}>projeção</span>}
        </div>
      </div>
      {draw&&(
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:6,paddingTop:6,borderTop:"1px dashed #e8edf5"}}>
          <span style={{fontSize:10,color:"#888"}}>Pênaltis:</span>
          <input value={ph} onChange={function(e){onScoreChange(m.id,"ph",e.target.value);}} maxLength={2} inputMode="numeric"
            style={{width:28,height:28,textAlign:"center",fontSize:13,fontWeight:900,borderRadius:7,border:"2px solid #fb8c00",outline:"none",color:"#fb8c00",padding:0}}/>
          <span style={{fontWeight:900,fontSize:12,color:"#aaa"}}>x</span>
          <input value={pa} onChange={function(e){onScoreChange(m.id,"pa",e.target.value);}} maxLength={2} inputMode="numeric"
            style={{width:28,height:28,textAlign:"center",fontSize:13,fontWeight:900,borderRadius:7,border:"2px solid #fb8c00",outline:"none",color:"#fb8c00",padding:0}}/>
        </div>
      )}
    </div>
  );
}

// ── Atualização de placares via API ─────────────────────────────────────────
var SCORES_API_URL = "https://copa26-proxy.brzl.workers.dev";
function applyRemoteScores(remoteMatches, prevScores){
  var next = Object.assign({}, prevScores);
  var updated = 0;
  remoteMatches.forEach(function(rm){
    if(rm.stage!=="GROUP_STAGE") return;
    if(!rm.score||!rm.score.fullTime) return;
    var hg=rm.score.fullTime.home; var ag=rm.score.fullTime.away;
    if(hg===null||ag===null||hg===undefined||ag===undefined) return;
    var home=rm.homeTeam&&rm.homeTeam.tla; var away=rm.awayTeam&&rm.awayTeam.tla;
    var gm=MATCHES.find(function(m){return m.home===home&&m.away===away;});
    if(!gm) return;
    var hKey=gm.id+"_h"; var aKey=gm.id+"_a"; var hVal=String(hg); var aVal=String(ag);
    if(next[hKey]!==hVal||next[aKey]!==aVal){ next[hKey]=hVal; next[aKey]=aVal; updated++; }
  });
  return {scores:next, updated:updated};
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App(){
  var s1=useState(loadScores); var scores=s1[0]; var setScores=s1[1];
  var s2=useState("jogos");    var tab=s2[0];    var setTab=s2[1];
  var s3=useState(loadGrp);    var grp=s3[0];    var setGrpRaw=s3[1];
  function setGrp(g){setGrpRaw(g);try{localStorage.setItem("tabela26_grp",g);}catch{ /* noop */ }}

  var s11=useState("grupo");  var jogSort=s11[0];var setJogSort=s11[1];
  var s12=useState("");       var jogFilter=s12[0];var setJogFilter=s12[1];
  var s13=useState("");       var jogSearch=s13[0];var setJogSearch=s13[1];
  var s14=useState(currentPhaseKey);var fase=s14[0];var setFase=s14[1];
  var s15=useState(false);    var updating=s15[0]; var setUpdating=s15[1];
  var s16=useState("");       var updateMsg=s16[0]; var setUpdateMsg=s16[1];

  function updateScoresFromApi(){
    setUpdating(true); setUpdateMsg("");
    fetch(SCORES_API_URL)
      .then(function(r){ if(!r.ok) throw new Error("HTTP "+r.status); return r.json(); })
      .then(function(data){
        var result=applyRemoteScores(data.matches||[],scores);
        setScores(result.scores);
        try{localStorage.setItem("tabela26_sc",JSON.stringify(result.scores));}catch{ /* noop */ }
        setUpdateMsg(result.updated>0?result.updated+" placar(es) atualizado(s).":"Nenhum jogo novo finalizado ainda.");
      })
      .catch(function(){ setUpdateMsg("Erro ao buscar placares. Tente novamente."); })
      .finally(function(){ setUpdating(false); });
  }

  function setScore(mid,side,val){
    var num=val.replace(/\D/g,"");
    var cl=num===""?"":String(Math.min(20,parseInt(num)||0));
    setScores(function(p){var n=Object.assign({},p,{}); n[mid+"_"+side]=cl; try{localStorage.setItem("tabela26_sc",JSON.stringify(n));}catch{ /* noop */ } return n;});
  }

  // Jogos filtrados e ordenados
  var filteredMatches=useMemo(function(){
    var list=MATCHES.slice();
    if(jogFilter) list=list.filter(function(m){return m.home===jogFilter||m.away===jogFilter;});
    if(jogSearch.trim()){
      var ql=jogSearch.trim().toLowerCase();
      list=list.filter(function(m){
        var hn=GROUPS_FLAT[m.home]; var an=GROUPS_FLAT[m.away];
        return (hn&&hn.name.toLowerCase().indexOf(ql)>=0)||(an&&an.name.toLowerCase().indexOf(ql)>=0)
          ||m.home.toLowerCase().indexOf(ql)>=0||m.away.toLowerCase().indexOf(ql)>=0
          ||m.venue.toLowerCase().indexOf(ql)>=0||m.date.indexOf(ql)>=0||m.grp.toLowerCase()===ql;
      });
    }
    if(jogSort==="data"){
      list.sort(function(a,b){
        var da=a.date.split("/").reverse().join("")+a.time;
        var db=b.date.split("/").reverse().join("")+b.time;
        return da.localeCompare(db);
      });
    } else {
      list.sort(function(a,b){
        if(a.grp!==b.grp) return a.grp.localeCompare(b.grp);
        var da=a.date.split("/").reverse().join("")+a.time;
        var db=b.date.split("/").reverse().join("")+b.time;
        return da.localeCompare(db);
      });
    }
    return list;
  },[jogSort,jogFilter,jogSearch]);

  // Mata-mata: projecao ao vivo a partir da classificacao (regras FIFA)
  var knockout=useMemo(function(){return buildKnockout(scores);},[scores]);

  var faseFilterBlock=(
    <div style={{background:"#fff",borderRadius:12,padding:"10px 12px",marginBottom:12,boxShadow:"0 1px 5px rgba(0,0,0,0.07)"}}>
      <div style={{fontSize:11,color:"#888",marginBottom:7}}>Fase:</div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
        {PHASES.map(function(p){
          return <button key={p.key} onClick={function(){setFase(p.key);}}
            style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,background:fase===p.key?"#002776":"#e8edf5",color:fase===p.key?"#fff":"#444"}}>{p.label}</button>;
        })}
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#f0f4f8",fontFamily:"'Segoe UI',sans-serif"}}>

      {/* HEADER */}
      <div style={{background:"linear-gradient(90deg,#002776,#009c3b)",padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:24}}>⚽</span>
        <div>
          <div style={{color:"#ffdf00",fontWeight:900,fontSize:13,lineHeight:1.1}}>Tabela Copa 2026</div>
          <div style={{color:"rgba(255,255,255,0.7)",fontSize:10}}>Jogos e Classificação</div>
        </div>
      </div>

      {/* TABS */}
      <div style={{display:"flex",background:"#fff",borderBottom:"2px solid #e8edf5"}}>
        {[["jogos","Jogos"],["class","Classificação"]].map(function(pair){
          var k=pair[0]; var l=pair[1];
          return <button key={k} onClick={function(){setTab(k);}}
            style={{flex:1,padding:"11px 2px",border:"none",background:"none",fontWeight:700,fontSize:13,cursor:"pointer",color:tab===k?"#002776":"#999",borderBottom:tab===k?"3px solid #009c3b":"3px solid transparent"}}>{l}</button>;
        })}
      </div>

      <div style={{padding:"12px 12px 30px",maxWidth:760,margin:"0 auto"}}>

        {/* ── ABA JOGOS ── */}
        {tab==="jogos"&&(
          <div>
            <div style={{background:"linear-gradient(90deg,#002776,#009c3b)",borderRadius:14,padding:"10px 14px",marginBottom:14}}>
              <div style={{color:"#ffdf00",fontWeight:900,fontSize:13}}>{fase==="grupos"?"Jogos da Fase de Grupos":"Fase Eliminatória"}</div>
              <div style={{color:"rgba(255,255,255,0.7)",fontSize:11}}>
                {fase==="grupos"?"72 partidas · Placares editáveis · escolha a fase abaixo":"Projeção ao vivo a partir da classificação (1º e 2º de cada grupo + 8 melhores 3ºs · regras FIFA)"}
              </div>
            </div>

            <div style={{background:"#fff",borderRadius:12,padding:"10px 12px",marginBottom:12,boxShadow:"0 1px 5px rgba(0,0,0,0.07)",display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
              <button onClick={updateScoresFromApi} disabled={updating}
                style={{padding:"7px 14px",borderRadius:20,border:"none",cursor:updating?"default":"pointer",fontWeight:700,fontSize:11,background:"#002776",color:"#fff",opacity:updating?0.6:1}}>
                {updating?"Atualizando...":"🔄 Atualizar placares"}
              </button>
              {updateMsg&&<span style={{fontSize:11,color:"#666"}}>{updateMsg}</span>}
            </div>

            {fase==="grupos"&&(
              <div>
                {/* Controles */}
                <div style={{background:"#fff",borderRadius:12,padding:"12px",marginBottom:12,boxShadow:"0 1px 5px rgba(0,0,0,0.07)"}}>
                  {/* Busca textual */}
                  <div style={{display:"flex",alignItems:"center",gap:8,background:"#f0f4f8",borderRadius:20,padding:"6px 12px",marginBottom:10}}>
                    <span style={{fontSize:13}}>🔍</span>
                    <input value={jogSearch} onChange={function(e){setJogSearch(e.target.value);}}
                      placeholder="Buscar por selecao, local, grupo, data..."
                      style={{flex:1,border:"none",background:"transparent",fontSize:12,outline:"none",color:"#333"}}/>
                    {jogSearch&&<button onClick={function(){setJogSearch("");}} style={{border:"none",background:"none",cursor:"pointer",fontSize:13,color:"#aaa",padding:0}}>x</button>}
                  </div>

                  {/* Ordenação */}
                  <div style={{display:"flex",gap:8,marginBottom:10}}>
                    <span style={{fontSize:11,color:"#888",alignSelf:"center"}}>Ordenar:</span>
                    {[["grupo","Por Grupo"],["data","Por Data/Hora"]].map(function(pair){
                      var k=pair[0]; var l=pair[1];
                      return <button key={k} onClick={function(){setJogSort(k);}}
                        style={{padding:"5px 12px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,background:jogSort===k?"#002776":"#e8edf5",color:jogSort===k?"#fff":"#444"}}>{l}</button>;
                    })}
                  </div>

                  {/* Filtro por seleção */}
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <span style={{fontSize:11,color:"#888"}}>Filtrar:</span>
                    <select value={jogFilter} onChange={function(e){setJogFilter(e.target.value);}}
                      style={{padding:"5px 10px",borderRadius:8,border:"1px solid #dde3ee",background:"#fff",fontWeight:700,fontSize:11,color:"#444",cursor:"pointer"}}>
                      <option value="">Todos</option>
                      {ALL_TEAMS.map(function(t){return <option key={t.id} value={t.id}>{t.id} · {t.name}</option>;})}
                    </select>
                  </div>
                </div>

                {faseFilterBlock}

                {/* Contador */}
                <div style={{fontSize:11,color:"#888",marginBottom:8}}>
                  Exibindo {filteredMatches.length} de {MATCHES.length} jogos
                  {jogFilter&&" · "+((GROUPS_FLAT[jogFilter]&&GROUPS_FLAT[jogFilter].name)||jogFilter)}
                </div>

                {/* Lista de jogos — agrupada se sort=grupo */}
                {(function(){
                  if(jogSort==="grupo"){
                    var byGrp={};
                    filteredMatches.forEach(function(m){ if(!byGrp[m.grp]) byGrp[m.grp]=[]; byGrp[m.grp].push(m); });
                    return Object.keys(byGrp).sort().map(function(g){
                      return (
                        <div key={g}>
                          <div style={{fontWeight:800,color:"#002776",fontSize:13,marginBottom:6,marginTop:4,
                            display:"flex",alignItems:"center",gap:8}}>
                            <span style={{background:"#002776",color:"#ffdf00",borderRadius:8,padding:"2px 8px",fontSize:11}}>Grupo {g}</span>
                            <span style={{fontSize:10,color:"#888"}}>{GROUPS[g]?GROUPS[g].map(function(t){return t.flag;}).join(" "):""}</span>
                          </div>
                          {byGrp[g].map(function(m){return <MatchRow key={m.id} m={m} showGrp={false} scores={scores} onScoreChange={setScore}/>;}) }
                        </div>
                      );
                    });
                  } else {
                    return filteredMatches.map(function(m){return <MatchRow key={m.id} m={m} showGrp={true} scores={scores} onScoreChange={setScore}/>;});
                  }
                })()}

                {filteredMatches.length===0&&(
                  <div style={{textAlign:"center",color:"#aaa",padding:"30px 0",fontSize:13}}>Nenhum jogo encontrado para este filtro.</div>
                )}
              </div>
            )}

            {fase!=="grupos"&&(
              <div>
                {faseFilterBlock}
                {fase==="qualified"&&(
                  <div style={{background:"#fff",borderRadius:12,padding:12,boxShadow:"0 1px 5px rgba(0,0,0,0.07)"}}>
                    {[
                      {title:"1ºs Colocados — classificados direto",arr:knockout.q.winners},
                      {title:"2ºs Colocados — classificados direto",arr:knockout.q.runnersup},
                      {title:"8 Melhores 3ºs Colocados — classificados",arr:knockout.q.bestThirds},
                      {title:"Demais 3ºs Colocados — eliminados",arr:knockout.q.rankedThirds.slice(8)}
                    ].map(function(sec,si){
                      return (
                        <div key={si} style={{marginBottom:si<3?14:0}}>
                          <div style={{fontWeight:800,color:"#002776",fontSize:11,marginBottom:5}}>{sec.title}</div>
                          {sec.arr.map(function(x,i){
                            var tm=GROUPS_FLAT[x.row.id];
                            return (
                              <div key={x.grp+"_"+x.pos} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 2px",borderBottom:"1px solid #f0f4f8",fontSize:11}}>
                                <span style={{width:16,textAlign:"center",fontWeight:800,color:"#888"}}>{i+1}</span>
                                <FlagImg tid={x.row.id} size={16}/>
                                <span style={{fontWeight:700,flex:1}}>{tm?tm.name:x.row.id}</span>
                                <span style={{fontSize:9,color:"#888"}}>Grupo {x.grp} · {x.pos}º</span>
                                <span style={{fontWeight:800,color:"#002776"}}>{x.row.pts} pts</span>
                                <span style={{fontSize:9,color:"#888",minWidth:34,textAlign:"right"}}>SG {x.row.sg>0?"+":""}{x.row.sg}</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                    <div style={{marginTop:10,fontSize:9,color:"#aaa"}}>Desempate dos 3ºs colocados: pontos → saldo de gols → gols pró → ordem do grupo.</div>
                  </div>
                )}
                {fase==="r32"&&knockout.r32.map(function(m){return <KnockoutRow key={m.id} m={m} scores={scores} onScoreChange={setScore}/>;})}
                {fase==="r16"&&knockout.r16.map(function(m){return <KnockoutRow key={m.id} m={m} scores={scores} onScoreChange={setScore}/>;})}
                {fase==="qf"&&knockout.qf.map(function(m){return <KnockoutRow key={m.id} m={m} scores={scores} onScoreChange={setScore}/>;})}
                {fase==="sf"&&knockout.sf.map(function(m){return <KnockoutRow key={m.id} m={m} scores={scores} onScoreChange={setScore}/>;})}
                {fase==="3rd"&&<KnockoutRow m={knockout.third} scores={scores} onScoreChange={setScore}/>}
                {fase==="final"&&<KnockoutRow m={knockout.final} scores={scores} onScoreChange={setScore}/>}
                {fase!=="qualified"&&(
                  <div style={{fontSize:9,color:"#aaa",marginTop:4}}>Times marcados como "projeção" ainda não têm o confronto anterior decidido — avançam provisoriamente pelo melhor ranking até que o placar (e, em empates, os pênaltis) seja informado.</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* CLASSIFICACAO GERAL */}
        {tab==="class"&&(
          <div>
            <div style={{background:"linear-gradient(90deg,#002776,#009c3b)",borderRadius:14,padding:"10px 14px",marginBottom:14}}>
              <div style={{color:"#ffdf00",fontWeight:900,fontSize:13}}>Classificacao Geral - Fase de Grupos</div>
              <div style={{color:"rgba(255,255,255,0.7)",fontSize:11}}>Baseada nos placares inseridos · Regras FIFA</div>
            </div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
              {GROUP_KEYS.map(function(g){
                return <button key={g} onClick={function(){setGrp(g);}}
                  style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:grp===g?"#002776":"#e8edf5",color:grp===g?"#fff":"#444"}}>Grupo {g}</button>;
              })}
            </div>
            <StandingsTable grpId={grp} sc={scores}/>
            {GROUP_KEYS.filter(function(g){return g!==grp;}).map(function(g){return <StandingsTable key={g} grpId={g} sc={scores}/>;}) }
          </div>
        )}

      </div>
    </div>
  );
}
