document.cookie = "human=human; Path=/; SameSite=Lax; Max-Age=31536000";
var engines = [
  {id:'mysql-sage', disabled:false, text:'MySQL sage',        url:'//sage.sqlzoo.net/sqlgo'},
  {id:'mysql-tinky',text:'MySQL tinky',        url:'//tinkywinky.sqlzoo.net/sqlgo'},
  {id:'postgres',   disabled:false, text:'PostgreSQL',  url:'//sage.sqlzoo.net/sqlgo'},
  {id:'mssql-sage', disabled:false, text:'Microsoft SQL',url:'//sage.sqlzoo.net/sqlgo'},
  {id:'oracle-sage',disabled:false, text:'Oracle',      url:'//sage.sqlzoo.net/sqlgo'},
];
if ($i('hostname')?.innerHTML === 'noddy'){
  engines = [
    {id:'mysql',text:'MySQL',     url:'//sqlzoo.net/sqlgo'},
  ];
}
$q('div.video').forEach(d=>d.append($m('video',{controls:true,width:600},[$m('source',{src:d.dataset.src})])));
if ($i('mw-sidebar-button') && $i('mw-sidebar-button').click){
  $i('mw-sidebar-button').click();
}
if ($i('yourHost') && $i('footer-places')){
  $i('footer-places').append($i('yourHost'));
}
if (RLCONF.wgUserName){
  $q1('#page-tools ul').append($i('ca-edit'));
}
(()=>{
  $q('p').filter(p=>p.innerText.indexOf('youtube')>=0).forEach(p=>{
    let r = p.innerText.split('|').map(t=>t.trim());
    if (r.length>0){
      p.innerHTML = `<iframe title="Play Video" src="//www.youtube.com/embed/${r[1].replaceAll('}','')}" width=476 height=268" frameborder=0 allowfullscreen=true data-orig-height=360 data-orig-width=640 style="width:476px;height:268px"></iframe>`;
    }
  });
})();

localStorage.randid ||= Math.floor(1E12*Math.random());
// SQL Engine should persist using localStorage
localStorage.engine ||= engines[0].id;
let urls = Object.fromEntries(engines.map(x=>[x.id,x.url]));
$i('user-tools').append(enginePicker('engine'));
function enginePicker(id){
  return $m('div',{},[
    $m('span',''),
    $m('select',{
        id,
        onchange:()=>{
          localStorage.engine = event.currentTarget.value;
          document.body.classList.add(event.currentTarget.value);
          if (id !== 'engine'){
            $i('engine').value = event.currentTarget.value;
          }
          engines.forEach(e=>document.body.classList.remove(e.id));
        }
      },engines.map(e=>$m('option',{...(e.disabled?{disabled:'disabled'}:{}),
        value:e.id,...((e.id===localStorage.engine && !e.disabled)?{selected:'selected'}:{})
    },e.text)))
  ]);
}
document.body.classList.add($i('engine').value);
(function(){
  $q('.hint').forEach(h => {
    h.parentNode.insertBefore($m('div',{'class':'tease',
        onclick:()=>{
          h.classList.toggle('hide');
        }},(h.title || 'hint')),h);
    h.classList.add('hide');
  });
  if (window.location.hostname=='zh.sqlzoo.net' ||
       window.location.hostname=='ac.sqlzoo.net' || 
       window.location.hostname=='noads.sqlzoo.net' || 
       window.location.hostname=='dw.sqlzoo.net' || 
       RLCONF.wgCanonicalNamespace == 'MediaWiki' ||
       RLCONF.wgCanonicalNamespace == 'Special'){
    return;
  }
  const bl = $q('.banners');
  if (bl.length>0){
    localStorage.vn = (localStorage.vn||0 === 0)?Math.floor(bl.length*Math.random()):(parseInt(localStorage.vn)+1);
    $i('mw-header').append(bl[localStorage.vn % bl.length]);
  }
})();

function getQKey(q,part = ''){
  return `prev_${RLCONF.wgPageName}#${q.dataset.qnumber}._${part}`;
}
// Parameters - things like "is order important?"
// Typically we set a page value and allow it to be overridden per question
let params = Object.fromEntries((document.querySelector('.params')?.innerText||'')
  .split(';')
  .map(t=>t.split(':').map(s=>s.trim())));

function findBestDefText(q,engine){
  let def = $q('.def',q)
    .filter(p => p.getAttribute('class')
      .split(' ')
      .filter(c=>c.startsWith('e-') && c!== `e-${engine}`).length===0
    ).toSorted((a,b)=>a.startsWith('e-')?-1:1);
  return def.length===0?'':def[0].innerText;
}
// We allow question numbers to start at any value. Useful for Easy, medium, hard exercises
let startAt = Math.max(1, parseInt($i('startAt')?.innerText || 0));
let qus = $q('.qu,.ht,.err');
qus.forEach((q,i)=>{
  let id = i + 1;
  let lsName = RLCONF.wgPageName + '_' + 'frm__' + id;
  let txt = findBestDefText(q, $i('engine').value);

  let ans = $q1('.ans', q)?.innerText || '';
  let nrows = 2 + Math.max(Math.max(4, txt.split(/[\n\r]+/).length), ans.split(/[\n\r]+/).length);
  let ncols = 2 + Math.max(Math.max(45, maxlen(txt.split(/[\n\r]+/))), maxlen(ans.split(/[\n\r]+/)));
  let tdy = $q1('.tdy', q)?.innerText || '';
  q.dataset.qnumber = id;
  q.append($m('div', {
      name: 'frm__' + id,
      id: 'frm__' + id,
      'class':'frm',
    },[
      $m('span',{'class':'quf'},[
        $m('textarea',{spellcheck:false,rows:nrows,cols:ncols,'class':'sql',id:`txtar_${id}`,onfocus:()=>{
          event.currentTarget.dataset.firstFocus ||= new Date().getTime();
        }},txt),
        $m('button',{onclick:()=>goBaby(q),'class':'submitSQL'},'Submit SQL'),
        $m('button',{'class':'reset',onclick:()=>{
          $i(`txtar_${id}`).value = findBestDefText(q, $i('engine').value);
        }},'restore default')
      ])
    ]));
  q.append($m('div', {},
    [
      $m('span',{'class': 'id'},`${startAt+i}.`),
      ...q.children,
    ]),
    $m('div',{'class':'res'},'result')
  );
  $q1('.sql',q).value = localStorage[getQKey(q,'attempt')] || $q1('.sql',q).value;
  localStorage[getQKey(q)] ||= "{}";

  //Show additional info if available for active angine
  numberOfQuestions = id;
  //You've been zooified - show yourself as such
  q.classList.add('zood');
});
//Put in the answers if url includes answer=1
if (window.location.search && /answer/.test(window.location.search)) {
  document.body.append(
    $m('div', {
    id:'cheat-mode-indicator',
    style: {
      position: 'fixed',
      right: '2ex',
      bottom: '2ex',
      width: '14ex',
      'background-color': 'yellow',
      padding: '2ex',
      'text-align': 'center'
    }
  },'Cheat mode'));
  $q('.qu').forEach(t => {
    $q1('textarea',t).value = $q1('.ans',t).innerText;
  })
}
let loadtime = (new Date()).getTime();
function goBaby(qu) {
  let textarea = $q1('textarea.sql',qu);
  let sql = textarea.value;
  let thinkingTime = (new Date()).getTime()-(textarea.dataset?.firstfocus||loadtime);
  let parlst = ($q1('.params')?.innerText || '').split(';');
  let params = Object.fromEntries(($q1('.params')?.innerText || '').split(';')
    .map(s=>s.split(':'))
    .filter(p=>p.length===2)
    .map(p=>p.map(kv=>kv.trim()))
  );
  localStorage[getQKey(qu,'attempt')] = sql;
  $q1('.res',qu).classList.add('waiting');
  fetch(urls[$i('engine').value],{
    'method': 'post',
    body: formData({
      sql: sql.replace(/\xA0/g, ' '), //Mediawiki inserts &nbsp; before a %. We need to change it back to a space.CM 13/6/12
      format: 'json',
      question: $q1('.id', qu).innerText,
      wgUserName: RLCONF.wgUserName,
      page: RLCONF.wgPageName,
      randid: localStorage.randid,
      server: $i('engine').value,
      setup: $q1('.setup', qu)?.innerText?.replace(/\xA0/g, ' '),
      tidy: $q1('.tidy', qu)?.innerText?.replace(/\xA0/g, ' '),
      answer: $q1('.ans', qu)?.innerText?.replace(/\xA0/g, ' '),
      schema: params['schema'],
      respectorder:$q('.respectorder',qu).length,
      iplo:document.body.dataset.iplo,
      thinkingTime:thinkingTime || 0,
      country: getCountry(),
    })
  })
    .then(r=>{
      if (r.status !== 200){
        return {error:r.status}
      }else{
        return r.json();
      }})
    .then(d=>{
      let res = $q1('.res',qu);
      res.innerHTML = '';
      res.classList.remove('waiting');
      if (d.error) {
        res.append(
          $m('h1', 'SQLZoo System Error A:'),
          $m('div', `${d.err}`));
        return;
      }
      let randid = localStorage.randid;
      //The score may be calculated at the server - if not we can do the calculation here
      if (d.sql && d.answer && d.sql.length===1 && d.answer.length === 1 &&
          d.sql[0].rows !== undefined && d.answer[0].rows !== undefined && d.score === undefined){
        d.score = 0;
        if (JSON.stringify(d.sql[0].rows) === JSON.stringify(d.answer[0].rows))
          d.score = 100;
        else{
          if ($('.respectorder',qu).length === 0){
            let s = d.sql[0].rows.slice();
            let a = d.answer[0].rows.slice();
            s.sort();
            a.sort();
            if (JSON.stringify(a) === JSON.stringify(s))
              d.score = 100;
          }
          if (d.score === 0 && d.sql[0].rows.length == d.answer[0].rows.length)
            d.score = 2
        }
      }
      if (d.err){
        res.append(
          $m('h2',`SQLZoo System Error B`),
          $m('div',`${d.err}`),
        );
	      return;
      }
      if (!sql.trim()){
        res.append(
          $m('h2',`Statement needed`),
          $m('div','Have a go at writing an SQL statement.'),
        );
	      return;
      }
      let rcount=null,fcount=null;
      if (d.sql[0].rows !== undefined){
        rcount = d.sql[0].rows.length;
        if (rcount>0)
          fcount = d.sql[0].rows[0].length;
      }
      let saveProgress = {
        cookie:randid, txt: sql, page: RLCONF.wgPageName,question: $('.id', qu).text(),
        qnum :  parseInt($('.id', qu).text()),rcount:rcount,fcount:fcount,
        errno:d.sql[0].err,errstr:d.sql[0].error,machine:$('#engine').val(),score:d.score,
        extime:0, wgUserName: RLCONF.wgUserName,lang:'sql',thinkingTime:thinkingTime||0,
        iplo:$('body').data('iplo'),whn:new Date().toISOString(),
      };
      localStorage[getQKey(qu)] = JSON.stringify(saveProgress);
      updateProgress(saveProgress.page);
      var headerPresent = false;
      for (var i = 0; i < d.sql.length; i++) {
        if (!d || !d.sql || !d.sql[i]) {
          res.append(
            $m('h2', 'SQLZoo System Error C:'),
            $m('div', "Problem with d or d.sql or d.sql[0]")
          );
          return;
        }
        if (d.sql[i].error) {
          res.append(
            $m('h1', 'SQL error'),
            $m('div', {'class':'errorMsg'}, d.sql[i].error)
          );
          if (d.sql[i].err === "HY000"){
            res.append($m('div','Your query took more than 2 seconds to run, it was abandoned. Sorry.'));
          }
          return;
        }
        var legend = "Result:";
        if (d.score!==undefined && d.answer && d.answer.length == 1 && d.answer[0].fields) {
          if (d.score == 100){
            legend = showCorrect(qu);
          }
          else if (d.answer[0].fields.length > d.sql[0].fields.length)
            legend = hideCorrect(qu,'Wrong answer. Too few columns.');
          else if (d.answer[0].fields.length < d.sql[0].fields.length)
            legend = hideCorrect(qu,'Wrong answer. Too many columns.');
          else if (d.answer[0].rows.length > d.sql[0].rows.length)
            legend = hideCorrect(qu,'Wrong answer. Too few rows.');
          else if (d.answer[0].rows.length < d.sql[0].rows.length)
            legend = hideCorrect(qu,'Wrong answer. Too many rows.');
          else
            legend = hideCorrect(qu,'Wrong answer. Some of the values are incorrect.');
        }
        if (!headerPresent) {
          res.append($m('h1', legend));
          headerPresent = true;
        }
        res.append(mkTable(d.sql[i],{'class':'sqlmine'}));
        if (d.answer && d.answer.length > 0  && d.answer[0].rows && (d.score || 0) < 100) {
          let ans = mkTable(d.answer[0],{'class':'sqlans'});
          res.append($m('div', {'class': 'showtxt',onclick:event=>{
            ans.classList.toggle('show');
          } }, 'Show what the answer should be...'));
          res.append(ans);
        }
      }
    })
    .catch((err,d)=>{
      console.log(err,d);
      let res = $q1('.res',qu);
      res.innerHTML = '';
      res.classList.remove('waiting');
      res.append(
        $m('h1', 'SQLZoo System Error F:'),
        $m('div',`If this persists, please report the error to sqlzoo.qa@gmail.com`),
        $m('pre',`${$i('engine').value}\n${new Date().toISOString()}\n${localStorage.randid}\n${err}`),
	$m('div',[
          'You can choose a different engine and try again: ',enginePicker()
        ])
      )
    })
  return false;
} //GoBaby

function showCorrect(qu) {
  var legend = 'Correct answer';
  if ($(".qcorrect", qu).length == 0) {
    var qcorr = $('<div/>', {
      'class': 'qcorrect',
      'title': 'You have answered this question correctly.',
      click:function(){$(this).hide();}
    });
    qcorr.hide();
    $('.id',qu).before(qcorr);
    qcorr.show('slow');
  }
  return legend;
}
function hideCorrect(qu,message){
  if($(".qcorrect",qu).length > 0){
    $('.qcorrect',qu).hide('slow',function(){
      $(this).remove();
    });
  }
  return message;
}
function maxlen(l) {
  var r = 0;
  for (var i = 0; i < l.length; i++)
    r = Math.max(r, l[i].length);
  return r;
}

function truncate(s) {
  if (s.length < 15) return s;
  return s.substring(0, 13) + "..";
}

function mkTable(a,props = {}) {
  return $m('table',props,[
    $m('tr',a.fields.map(f=>$m('th',`${f}`))),
    ...a.rows.map(r=>$m('tr',r.map(c=>$m('td',isNaN(c)?{}:{'class':'r'},`${c}`))))
  ]);
  t.append($('<tr/>'));
  var isnum = [];
  if (!a.fields || !a.rows) return t;
  for (var i = 0; i < a.fields.length; i++) {
    $('tr', t).append($('<th/>', {
      text: truncate(a.fields[i])
    }));
    var allNum = 1;
    for (var j = 0; j < a.rows.length; j++) {
      if (a.rows[j] && a.rows[j][i] && (typeof a.rows[j][i] == "string") && !a.rows[j][i].match(/^[0-9.]*$/) && a.rows[j][i]!='null')
        allNum = 0;
    }
    isnum.push(allNum);
  }
  for (var j = 0; j < a.rows.length; j++) {
    var tr = $('<tr/>').appendTo(t);
    for (var k = 0; k < a.rows[j].length; k++) {
      var td = $('<td/>', {
        text: a.rows[j][k]
      });
      if (isnum[k]) td.addClass('r');
      td.appendTo(tr);
    }
  }
  if (a.truncated){
    var tr = $('<tr/>').appendTo(t);
    tr.append($('<td/>',{text:'Results truncated. Only the first '+a.rows.length+' rows have been shown.',
                         colspan:a.fields.length}));
  }
  return t;
}

/* quiz.js */
(function () {
  $q('.quiz .q').forEach((e,i)=>{
    e.prepend((i+1)+'. ');
    $q('.d',e).forEach(d=>{
      d.onclick = () =>{
        $q('.picked',e).forEach(d=>d.classList.remove('picked'));
        d.classList.add('picked');
    };
  })});
  $q('.quiz').forEach(q=>q.append($m('button','Score the test',{
    onclick:()=>{
      $q('.mark-wrong').forEach(d=>d.classList.remove('mark-wrong'));
      $q('.mark-correct').forEach(d=>d.classList.remove('mark-correct'));
      $q('.quiz .q .picked').forEach(d=>d.classList.add(d.classList.contains('y')?'mark-correct':'mark-wrong'))
      $q('.feedback',q).forEach(f=>f.remove());
      let score = $q('.mark-correct',q).length;
      let outof = $q('.q',q).length;
      let feedback = $m('div',{'class':'feedback'},
        `Your score is: ${score} out of ${outof}`);
      q.append(feedback);
      let pageName = RLCONF.wgPageName;
      localStorage[`quiz_${pageName}`] = JSON.stringify({done:score,outof});
      updateQuiz(pageName);
    }
  })));
})();

/* progress.js */
let updateProgress;
let updateQuiz;
(function(){
  //Find the left tutorial elements
  //We want to show progress for these
  let lst = $q('li',$i('n-SELECT-basics').parentElement);
  lst.forEach(t => {
    t.append($m('progress',{max:1,value:0}));
  });
  let questionByPage = {};
  for(let k in localStorage){
    if (k.startsWith('prev') && k.endsWith('_')){
      let pq = k.substring(5).split('#');
      questionByPage[pq[0]] ||= new Set();
      questionByPage[pq[0]].add(pq[1].substring(0,pq[1].length-2));
    };
  }
  let progMap = Object.fromEntries($q('#p- li a').map(p=>[p.href.split('/').pop(),p]));
  let drawBar = (p,done,outof) => {
    if (p === undefined){
      return;
    }
    let pbar = $q1('progress',p.parentElement);
    if (!pbar){
      console.warn(`missing progress bar for {p}`);
      return;
    }
    let pbarbg = pbar.parentElement;
    pbar.max = outof;
    pbar.value = done;
    pbarbg.title = `you have completed ${done} of ${outof}`;
  }
  updateQuiz = (k)=>{
    let p = progMap[k];
    if (localStorage[`quiz_${k}`] === undefined){
      return;
    }
    let q = JSON.parse(localStorage[`quiz_${k}`]);
    drawBar(p,q.done,q.outof);
  }
  for(let k in localStorage){
    if (k.startsWith('quiz_')){
      updateQuiz(k.substring(5));
    }
  }
  updateProgress = (k)=>{
    let p = progMap[k];
    let pgn = questionByPage[k];
    if (pgn !== undefined){
      let done = Array.from(pgn)
                    .map(q=>`prev_${k}#${q}._`)
                    .map(k=>JSON.parse(localStorage[k]))
                    .filter(p=>p.score===100).length;
      drawBar(p,done, pgn.size);
    }
  }
  for(let k in questionByPage){
    updateProgress(k);
  }
  return;
})();

let c2c = {"Andorra":"Andorra","Dubai":"United Arab Emirates","Kabul":"Afghanistan","Tirane":"Albania","Yerevan":"Armenia","Casey":"Antarctica","Davis":"Antarctica","Mawson":"Antarctica","Palmer":"Antarctica","Rothera":"Antarctica","Troll":"Antarctica","Vostok":"Antarctica","Buenos_Aires":"Argentina","Cordoba":"Argentina","Salta":"Argentina","Jujuy":"Argentina","Tucuman":"Argentina","Catamarca":"Argentina","La_Rioja":"Argentina","San_Juan":"Argentina","Mendoza":"Argentina","San_Luis":"Argentina","Rio_Gallegos":"Argentina","Ushuaia":"Argentina","Pago_Pago":"Samoa (American)","Vienna":"Austria","Lord_Howe":"Australia","Macquarie":"Australia","Hobart":"Australia","Melbourne":"Australia","Sydney":"Australia","Broken_Hill":"Australia","Brisbane":"Australia","Lindeman":"Australia","Adelaide":"Australia","Darwin":"Australia","Perth":"Australia","Eucla":"Australia","Baku":"Azerbaijan","Barbados":"Barbados","Dhaka":"Bangladesh","Brussels":"Belgium","Sofia":"Bulgaria","Bermuda":"Bermuda","Brunei":"Brunei","La_Paz":"Bolivia","Noronha":"Brazil","Belem":"Brazil","Fortaleza":"Brazil","Recife":"Brazil","Araguaina":"Brazil","Maceio":"Brazil","Bahia":"Brazil","Sao_Paulo":"Brazil","Campo_Grande":"Brazil","Cuiaba":"Brazil","Santarem":"Brazil","Porto_Velho":"Brazil","Boa_Vista":"Brazil","Manaus":"Brazil","Eirunepe":"Brazil","Rio_Branco":"Brazil","Thimphu":"Bhutan","Minsk":"Belarus","Belize":"Belize","St_Johns":"Canada","Halifax":"Canada","Glace_Bay":"Canada","Moncton":"Canada","Goose_Bay":"Canada","Toronto":"Canada","Nipigon":"Canada","Thunder_Bay":"Canada","Iqaluit":"Canada","Pangnirtung":"Canada","Winnipeg":"Canada","Rainy_River":"Canada","Resolute":"Canada","Rankin_Inlet":"Canada","Regina":"Canada","Swift_Current":"Canada","Edmonton":"Canada","Cambridge_Bay":"Canada","Yellowknife":"Canada","Inuvik":"Canada","Dawson_Creek":"Canada","Fort_Nelson":"Canada","Whitehorse":"Canada","Dawson":"Canada","Vancouver":"Canada","Cocos":"Cocos (Keeling) Islands","Zurich":"Switzerland","Abidjan":"Côte d'Ivoire","Rarotonga":"Cook Islands","Santiago":"Chile","Punta_Arenas":"Chile","Easter":"Chile","Shanghai":"China","Urumqi":"China","Bogota":"Colombia","Costa_Rica":"Costa Rica","Havana":"Cuba","Cape_Verde":"Cape Verde","Christmas":"Christmas Island","Nicosia":"Cyprus","Famagusta":"Cyprus","Prague":"Czech Republic","Berlin":"Germany","Copenhagen":"Denmark","Santo_Domingo":"Dominican Republic","Algiers":"Algeria","Guayaquil":"Ecuador","Galapagos":"Ecuador","Tallinn":"Estonia","Cairo":"Egypt","El_Aaiun":"Western Sahara","Madrid":"Spain","Ceuta":"Spain","Canary":"Spain","Helsinki":"Finland","Fiji":"Fiji","Stanley":"Falkland Islands","Chuuk":"Micronesia","Pohnpei":"Micronesia","Kosrae":"Micronesia","Faroe":"Faroe Islands","Paris":"France","London":"United Kingdom","Tbilisi":"Georgia","Cayenne":"French Guiana","Gibraltar":"Gibraltar","Nuuk":"Greenland","Danmarkshavn":"Greenland","Scoresbysund":"Greenland","Thule":"Greenland","Athens":"Greece","South_Georgia":"South Georgia & the South Sandwich Islands","Guatemala":"Guatemala","Guam":"Guam","Bissau":"Guinea-Bissau","Guyana":"Guyana","Hong_Kong":"Hong Kong","Tegucigalpa":"Honduras","Port-au-Prince":"Haiti","Budapest":"Hungary","Jakarta":"Indonesia","Pontianak":"Indonesia","Makassar":"Indonesia","Jayapura":"Indonesia","Dublin":"Ireland","Jerusalem":"Israel","Kolkata":"India","Calcutta":"India","Chagos":"British Indian Ocean Territory","Baghdad":"Iraq","Tehran":"Iran","Reykjavik":"Iceland","Rome":"Italy","Jamaica":"Jamaica","Amman":"Jordan","Tokyo":"Japan","Nairobi":"Kenya","Bishkek":"Kyrgyzstan","Tarawa":"Kiribati","Kanton":"Kiribati","Kiritimati":"Kiribati","Pyongyang":"North Korea","Seoul":"South Korea","Almaty":"Kazakhstan","Qyzylorda":"Kazakhstan","Qostanay":"Kazakhstan","Aqtobe":"Kazakhstan","Aqtau":"Kazakhstan","Atyrau":"Kazakhstan","Oral":"Kazakhstan","Beirut":"Lebanon","Colombo":"Sri Lanka","Monrovia":"Liberia","Vilnius":"Lithuania","Luxembourg":"Luxembourg","Riga":"Latvia","Tripoli":"Libya","Casablanca":"Morocco","Monaco":"Monaco","Chisinau":"Moldova","Majuro":"Marshall Islands","Kwajalein":"Marshall Islands","Yangon":"Myanmar","Ulaanbaatar":"Mongolia","Hovd":"Mongolia","Choibalsan":"Mongolia","Macau":"Macau","Martinique":"Martinique","Malta":"Malta","Mauritius":"Mauritius","Maldives":"Maldives","Mexico_City":"Mexico","Cancun":"Mexico","Merida":"Mexico","Monterrey":"Mexico","Matamoros":"Mexico","Mazatlan":"Mexico","Chihuahua":"Mexico","Ojinaga":"Mexico","Hermosillo":"Mexico","Tijuana":"Mexico","Bahia_Banderas":"Mexico","Kuala_Lumpur":"Malaysia","Kuching":"Malaysia","Maputo":"Mozambique","Windhoek":"Namibia","Noumea":"New Caledonia","Norfolk":"Norfolk Island","Lagos":"Nigeria","Managua":"Nicaragua","Amsterdam":"Netherlands","Oslo":"Norway","Kathmandu":"Nepal","Katmandu":"Nepal","Nauru":"Nauru","Niue":"Niue","Auckland":"New Zealand","Chatham":"New Zealand","Panama":"Panama","Lima":"Peru","Tahiti":"French Polynesia","Marquesas":"French Polynesia","Gambier":"French Polynesia","Port_Moresby":"Papua New Guinea","Bougainville":"Papua New Guinea","Manila":"Philippines","Karachi":"Pakistan","Warsaw":"Poland","Miquelon":"St Pierre & Miquelon","Pitcairn":"Pitcairn","Puerto_Rico":"Puerto Rico","Gaza":"Palestine","Hebron":"Palestine","Lisbon":"Portugal","Madeira":"Portugal","Azores":"Portugal","Palau":"Palau","Asuncion":"Paraguay","Qatar":"Qatar","Reunion":"Réunion","Bucharest":"Romania","Belgrade":"Serbia","Kaliningrad":"Russia","Moscow":"Russia","Simferopol":"Russia","Kirov":"Russia","Volgograd":"Russia","Astrakhan":"Russia","Saratov":"Russia","Ulyanovsk":"Russia","Samara":"Russia","Yekaterinburg":"Russia","Omsk":"Russia","Novosibirsk":"Russia","Barnaul":"Russia","Tomsk":"Russia","Novokuznetsk":"Russia","Krasnoyarsk":"Russia","Irkutsk":"Russia","Chita":"Russia","Yakutsk":"Russia","Khandyga":"Russia","Vladivostok":"Russia","Ust-Nera":"Russia","Magadan":"Russia","Sakhalin":"Russia","Srednekolymsk":"Russia","Kamchatka":"Russia","Anadyr":"Russia","Riyadh":"Saudi Arabia","Guadalcanal":"Solomon Islands","Mahe":"Seychelles","Khartoum":"Sudan","Stockholm":"Sweden","Singapore":"Singapore","Paramaribo":"Suriname","Juba":"South Sudan","Sao_Tome":"Sao Tome & Principe","El_Salvador":"El Salvador","Damascus":"Syria","Grand_Turk":"Turks & Caicos Is","Ndjamena":"Chad","Kerguelen":"French Southern & Antarctic Lands","Bangkok":"Thailand","Dushanbe":"Tajikistan","Fakaofo":"Tokelau","Dili":"East Timor","Ashgabat":"Turkmenistan","Tunis":"Tunisia","Tongatapu":"Tonga","Istanbul":"Turkey","Funafuti":"Tuvalu","Taipei":"Taiwan","Kiev":"Ukraine","Kyiv":"Ukraine","Uzhgorod":"Ukraine","Zaporozhye":"Ukraine","Wake":"US minor outlying islands","New_York":"United States","Detroit":"United States","Louisville":"United States","Monticello":"United States","Indianapolis":"United States","Vincennes":"United States","Winamac":"United States","Marengo":"United States","Petersburg":"United States","Vevay":"United States","Chicago":"United States","Tell_City":"United States","Knox":"United States","Menominee":"United States","Center":"United States","New_Salem":"United States","Beulah":"United States","Denver":"United States","Boise":"United States","Phoenix":"United States","Los_Angeles":"United States","Anchorage":"United States","Juneau":"United States","Sitka":"United States","Metlakatla":"United States","Yakutat":"United States","Nome":"United States","Adak":"United States","Honolulu":"United States","Montevideo":"Uruguay","Samarkand":"Uzbekistan","Tashkent":"Uzbekistan","Caracas":"Venezuela","Ho_Chi_Minh":"Vietnam","Saigon":"Vietnam","Efate":"Vanuatu","Wallis":"Wallis & Futuna","Apia":"Samoa (western)","Johannesburg":"South Africa","Antigua":"Antigua & Barbuda","Anguilla":"Anguilla","Luanda":"Angola","McMurdo":"Antarctica","DumontDUrville":"Antarctica","Syowa":"Antarctica","Aruba":"Aruba","Mariehamn":"Åland Islands","Sarajevo":"Bosnia & Herzegovina","Ouagadougou":"Burkina Faso","Bahrain":"Bahrain","Bujumbura":"Burundi","Porto-Novo":"Benin","St_Barthelemy":"St Barthelemy","Kralendijk":"Caribbean NL","Nassau":"Bahamas","Gaborone":"Botswana","Blanc-Sablon":"Canada","Atikokan":"Canada","Creston":"Canada","Kinshasa":"Congo (Dem. Rep.)","Lubumbashi":"Congo (Dem. Rep.)","Bangui":"Central African Rep.","Brazzaville":"Congo (Rep.)","Douala":"Cameroon","Curacao":"Curaçao","Busingen":"Germany","Djibouti":"Djibouti","Dominica":"Dominica","Asmara":"Eritrea","Addis_Ababa":"Ethiopia","Libreville":"Gabon","Grenada":"Grenada","Guernsey":"Guernsey","Accra":"Ghana","Banjul":"Gambia","Conakry":"Guinea","Guadeloupe":"Guadeloupe","Malabo":"Equatorial Guinea","Zagreb":"Croatia","Isle_of_Man":"Isle of Man","Jersey":"Jersey","Phnom_Penh":"Cambodia","Comoro":"Comoros","St_Kitts":"St Kitts & Nevis","Kuwait":"Kuwait","Cayman":"Cayman Islands","Vientiane":"Laos","St_Lucia":"St Lucia","Vaduz":"Liechtenstein","Maseru":"Lesotho","Podgorica":"Montenegro","Marigot":"St Martin (French)","Antananarivo":"Madagascar","Skopje":"North Macedonia","Bamako":"Mali","Saipan":"Northern Mariana Islands","Nouakchott":"Mauritania","Montserrat":"Montserrat","Blantyre":"Malawi","Niamey":"Niger","Muscat":"Oman","Kigali":"Rwanda","St_Helena":"St Helena","Ljubljana":"Slovenia","Longyearbyen":"Svalbard & Jan Mayen","Bratislava":"Slovakia","Freetown":"Sierra Leone","San_Marino":"San Marino","Dakar":"Senegal","Mogadishu":"Somalia","Lower_Princes":"St Maarten (Dutch)","Mbabane":"Eswatini","Lome":"Togo","Port_of_Spain":"Trinidad & Tobago","Dar_es_Salaam":"Tanzania","Kampala":"Uganda","Midway":"US minor outlying islands","Vatican":"Vatican City","St_Vincent":"St Vincent","Tortola":"Virgin Islands (UK)","St_Thomas":"Virgin Islands (US)","Aden":"Yemen","Mayotte":"Mayotte","Lusaka":"Zambia","Harare":"Zimbabwe"};
let getCountry = ()=>{
  if (Intl){
    let tzArr = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/');
    return c2c[tzArr[tzArr.length-1]] || `U:${tzArr[tzArr.length-1]}`
  }
  return 'browser no good'
}
let getTZ = ()=>{
  if (Intl){
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return 'browser no good'
}
(function(){
      fetch(`/analytics?r=${localStorage.randid}&c=${getCountry()}&p=${document.location.pathname}&n=${localStorage.vn||0}&tz=${getTZ()}`);
    })
();

function formData(d){
  let ret = new FormData();
  for(let k in d){
    if (d[k]!==undefined)
      ret.append(k,d[k])
  };
  return ret;
}
function $i(id) { return document.getElementById(id);}
function $q (addr,context){ return Array.from((context||document).querySelectorAll(addr));}
function $q1 (addr,context){ return (context||document).querySelector(addr);}
function $m(tag,props,children){
  let args = [...arguments];
  let ret = document.createElement(args.shift());
  for(let a of args){
    if (typeof a === "string")
      ret.innerHTML = a;
    else if (Array.isArray(a)){
      for(let c of a){
        if (typeof c === 'string'){
            ret.appendChild(document.createTextNode(c))
        }else{
            ret.appendChild(c);
        }
      }
    }else{
      for(let k in a){
        if (k === 'text'){
          ret.innerText = a[k];
        }else if (k.startsWith('on'))
          ret.addEventListener(k.substr(2),a[k]);
        else if (k==='style' && typeof(a[k])==='object')
          ret[k] = Object.entries(a[k]).map(p=>p.join(':')).join(';');
        else
          ret.setAttribute(k,props[k]);
      }
    }
  }
  return ret;
}
