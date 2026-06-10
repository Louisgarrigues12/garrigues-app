import { useState, useRef, useEffect, useCallback } from "react";

const C={navy:"#1B3A6B",red:"#E8401C",orange:"#F5A623",light:"#F4F6FB",white:"#FFF",gray:"#64748B",lgray:"#E2E8F0",green:"#16A34A",text:"#1E293B"};
const BN=({s=22})=><span style={{fontFamily:"Arial Black,Impact,sans-serif",fontWeight:900,fontStyle:"italic",fontSize:s,color:C.red,letterSpacing:1}}>GARRIGUES</span>;
const CAT={"Pomme de terre":{e:"🥔",c:C.orange,l:"#FFF7ED"},"Échalote":{e:"🧅",c:C.red,l:"#FFF0F6"},"Oignon":{e:"🧅",c:C.green,l:"#F0FDF4"},"Ail":{e:"🧄",c:C.navy,l:"#EEF2FF"}};
const CP=[{t:"25 plants"},{t:"60 plants"},{t:"100 plants"},{t:"1,5 kg"},{t:"3 kg"},{t:"5 kg"},{t:"10 kg"},{t:"25 kg"}];
const CS=[{t:"250 g"},{t:"500 g"},{t:"25 kg"}];
const CB=[{t:"250 g"},{t:"500 g"},{t:"20 kg"}];
const bio=n=>n.toLowerCase().includes("bio");
const getConds=v=>{if(v.cat==="Pomme de terre")return CP;if(v.cat==="Oignon")return bio(v.nom)?CB:CS;return CB;};

const VS=[
  {id:1,nom:"Actrice",cat:"Pomme de terre",cycle:"Mi-tardif",usage:"Consommation",res:"Bonne au mildiou",qual:"Chair ferme, saveur douce",cal:["35/50"]},
  {id:2,nom:"Agata",cat:"Pomme de terre",cycle:"Précoce",usage:"Consommation / Primeur",res:"Sensible au mildiou",qual:"Chair jaune ferme, excellente saveur",cal:["28/35","35/50"]},
  {id:3,nom:"Agria",cat:"Pomme de terre",cycle:"Mi-tardif",usage:"Frites / Industrie",res:"Bonne résistance",qual:"Chair jaune, excellente pour frites",cal:["28/35","35/45"]},
  {id:4,nom:"Alouette",cat:"Pomme de terre",cycle:"Mi-précoce",usage:"Consommation",res:"Résistance moyenne",qual:"Chair blanche, polyvalente",cal:["25/35","35/45"]},
  {id:5,nom:"Amandine",cat:"Pomme de terre",cycle:"Précoce",usage:"Consommation / Primeur",res:"Bonne",qual:"Chair ferme, saveur fine",cal:["25/32"]},
  {id:6,nom:"Annabelle",cat:"Pomme de terre",cycle:"Précoce",usage:"Consommation",res:"Bonne (nématodes)",qual:"Chair jaune ferme, goût excellent",cal:["25/32","32/40"]},
  {id:7,nom:"Anaïs",cat:"Pomme de terre",cycle:"Mi-précoce",usage:"Consommation",res:"Résistance correcte",qual:"Chair blanche, polyvalente",cal:["28/35","35/45"]},
  {id:8,nom:"BF15",cat:"Pomme de terre",cycle:"Mi-tardif",usage:"Consommation / Salade",res:"Bonne",qual:"Chair ferme jaune, saveur fine",cal:["25/32","32/40"]},
  {id:9,nom:"Belle de Fontenay",cat:"Pomme de terre",cycle:"Précoce",usage:"Gastronomie",res:"Sensible au mildiou",qual:"Chair ferme, goût exceptionnel",cal:["25/30","32/40"]},
  {id:10,nom:"Bintje",cat:"Pomme de terre",cycle:"Mi-tardif",usage:"Frites / Purée",res:"Sensible au mildiou",qual:"Chair jaune, très polyvalente",cal:["28/35","35/45"]},
  {id:11,nom:"Caesar",cat:"Pomme de terre",cycle:"Mi-tardif",usage:"Consommation",res:"Bonne résistance globale",qual:"Chair jaune, bonne tenue cuisson",cal:["35/45"]},
  {id:12,nom:"Carrera",cat:"Pomme de terre",cycle:"Tardif",usage:"Consommation / Industrie",res:"Très bonne résistance",qual:"Chair blanche, gros calibre",cal:["45/55"]},
  {id:13,nom:"Cephora",cat:"Pomme de terre",cycle:"Mi-précoce",usage:"Consommation",res:"Bonne",qual:"Chair jaune, saveur agréable",cal:["28/35","35/45"]},
  {id:14,nom:"Charlotte",cat:"Pomme de terre",cycle:"Mi-précoce",usage:"Consommation / Salade",res:"Résistance moyenne",qual:"Chair ferme jaune, saveur douce",cal:["25/35","35/45"]},
  {id:15,nom:"Chérie",cat:"Pomme de terre",cycle:"Précoce",usage:"Gastronomie",res:"Bonne",qual:"Chair rouge rosée, saveur fine",cal:["25/32","32/40"]},
  {id:16,nom:"Colomba",cat:"Pomme de terre",cycle:"Mi-précoce",usage:"Consommation",res:"Bonne (maladies)",qual:"Chair blanche, peau lisse",cal:["28/35","35/50"]},
  {id:17,nom:"Désirée",cat:"Pomme de terre",cycle:"Mi-tardif",usage:"Consommation / Purée",res:"Bonne (sécheresse)",qual:"Chair jaune, peau rouge",cal:["28/35","35/50"]},
  {id:18,nom:"Elodie",cat:"Pomme de terre",cycle:"Mi-précoce",usage:"Consommation",res:"Bonne",qual:"Chair jaune ferme",cal:["28/35","35/45"]},
  {id:19,nom:"Federica",cat:"Pomme de terre",cycle:"Mi-précoce",usage:"Consommation",res:"Bonne au mildiou",qual:"Chair jaune, bonne conservation",cal:["28/35","35/45"]},
  {id:20,nom:"Institut de Beauvais",cat:"Pomme de terre",cycle:"Tardif",usage:"Consommation / Industrie",res:"Bonne",qual:"Chair blanche, gros rendement",cal:["35/60"]},
  {id:21,nom:"Kennebec",cat:"Pomme de terre",cycle:"Tardif",usage:"Frites / Chips",res:"Bonne résistance globale",qual:"Chair blanche, idéale transformation",cal:["35/60"]},
  {id:22,nom:"Linzer Delikatess",cat:"Pomme de terre",cycle:"Précoce",usage:"Gastronomie / Salade",res:"Sensible",qual:"Chair jaune très ferme, saveur exc.",cal:["25/32"]},
  {id:23,nom:"Marabel",cat:"Pomme de terre",cycle:"Mi-précoce",usage:"Consommation",res:"Bonne au mildiou",qual:"Chair jaune, aspect lisse",cal:["28/35","35/45"]},
  {id:24,nom:"Monalisa",cat:"Pomme de terre",cycle:"Mi-tardif",usage:"Consommation / Frites",res:"Bonne (sécheresse)",qual:"Chair jaune ferme, polyvalente",cal:["35/45","45/50"]},
  {id:25,nom:"Nazca",cat:"Pomme de terre",cycle:"Mi-tardif",usage:"Consommation",res:"Très bonne résistance",qual:"Chair blanche, bonne tenue",cal:["35/50"]},
  {id:26,nom:"Nicola",cat:"Pomme de terre",cycle:"Mi-précoce",usage:"Consommation / Salade",res:"Bonne",qual:"Chair jaune ferme, saveur fine",cal:["28/35","35/45"]},
  {id:27,nom:"Ratte",cat:"Pomme de terre",cycle:"Tardif",usage:"Gastronomie",res:"Sensible au mildiou",qual:"Chair ferme, goût de noisette",cal:["25/35"]},
  {id:28,nom:"Red Pontiac",cat:"Pomme de terre",cycle:"Mi-tardif",usage:"Consommation / Purée",res:"Bonne",qual:"Chair blanche, peau rouge",cal:["35/60"]},
  {id:29,nom:"Rudolph",cat:"Pomme de terre",cycle:"Précoce",usage:"Consommation",res:"Bonne au mildiou",qual:"Chair jaune, peau rouge vive",cal:["28/40","40/50"]},
  {id:30,nom:"Rosabelle",cat:"Pomme de terre",cycle:"Mi-précoce",usage:"Consommation",res:"Bonne",qual:"Chair rosée, aspect original",cal:["25/35","35/45"]},
  {id:31,nom:"Roseval",cat:"Pomme de terre",cycle:"Mi-tardif",usage:"Consommation / Salade",res:"Résistance moyenne",qual:"Chair jaune, peau rouge, saveur douce",cal:["25/32","32/40"]},
  {id:32,nom:"Sirtema",cat:"Pomme de terre",cycle:"Très précoce",usage:"Primeur / Consommation",res:"Sensible au mildiou",qual:"Chair blanche, très précoce",cal:["28/40","40/50"]},
  {id:33,nom:"Spunta",cat:"Pomme de terre",cycle:"Précoce",usage:"Consommation",res:"Résistance correcte",qual:"Chair jaune, allongée, bonne saveur",cal:["28/35","35/45"]},
  {id:34,nom:"Steemsters",cat:"Pomme de terre",cycle:"Tardif",usage:"Consommation / Industrie",res:"Très bonne résistance",qual:"Chair blanche, gros rendement",cal:["28/40","40/50"]},
  {id:35,nom:"Vitelotte",cat:"Pomme de terre",cycle:"Tardif",usage:"Gastronomie",res:"Robuste",qual:"Chair violette, saveur de châtaigne",cal:["25/32"]},
  {id:36,nom:"Jermor",cat:"Échalote",cycle:"Mi-tardif",usage:"Consommation / Cuisine",res:"Bonne résistance",qual:"Saveur douce, longue conservation",cal:["Unique"]},
  {id:37,nom:"Mikor",cat:"Échalote",cycle:"Mi-précoce",usage:"Consommation / Cuisine",res:"Bonne au mildiou",qual:"Saveur prononcée, peau cuivrée",cal:["Unique"]},
  {id:38,nom:"Longor Bio",cat:"Échalote",cycle:"Mi-tardif",usage:"Bio / Gastronomie",res:"Adaptée bio",qual:"Saveur fine, forme allongée",cal:["Unique"]},
  {id:48,nom:"Longor",cat:"Échalote",cycle:"Mi-tardif",usage:"Consommation / Gastronomie",res:"Bonne résistance",qual:"Saveur fine et douce, forme allongée",cal:["Unique"]},
  {id:39,nom:"Stuttgarter",cat:"Oignon",cycle:"Tardif",usage:"Consommation / Conservation",res:"Très bonne conservation",qual:"Saveur douce, peau dorée",cal:["Unique"]},
  {id:40,nom:"Sturon",cat:"Oignon",cycle:"Mi-tardif",usage:"Consommation / Conservation",res:"Bonne résistance",qual:"Forme ronde, saveur douce",cal:["10/21","22/26"]},
  {id:41,nom:"Paille des vertus",cat:"Oignon",cycle:"Tardif",usage:"Consommation",res:"Bonne résistance",qual:"Saveur forte, tradition française",cal:["Unique"]},
  {id:42,nom:"Snowball",cat:"Oignon",cycle:"Mi-précoce",usage:"Consommation / Cuisine",res:"Correcte",qual:"Oignon blanc, doux et croquant",cal:["Unique"]},
  {id:43,nom:"Red Karmen",cat:"Oignon",cycle:"Mi-tardif",usage:"Consommation / Salade",res:"Bonne",qual:"Oignon rouge, saveur douce et sucrée",cal:["Unique"]},
  {id:44,nom:"Sturon Bio",cat:"Oignon",cycle:"Mi-tardif",usage:"Bio / Conservation",res:"Adaptée bio",qual:"Forme ronde, culture biologique",cal:["10/21","22/26"]},
  {id:45,nom:"Red Baron Bio",cat:"Oignon",cycle:"Mi-tardif",usage:"Bio / Salade",res:"Adaptée bio",qual:"Oignon rouge bio, saveur fine",cal:["10/21","22/26"]},
  {id:46,nom:"Cledor",cat:"Ail",cycle:"Tardif",usage:"Consommation / Cuisine",res:"Bonne (maladies)",qual:"Ail blanc, saveur intense",cal:["Unique"]},
  {id:47,nom:"Flavor",cat:"Ail",cycle:"Mi-tardif",usage:"Consommation / Gastronomie",res:"Bonne résistance",qual:"Ail rose, arôme subtil",cal:["Unique"]},
];

const mkT=()=>{const t={};VS.forEach(v=>{getConds(v).forEach((_,i)=>v.cal.forEach(c=>{t[`${v.id}__${c}__${i}`]="";}));});return t;};
const mkS=()=>{const s={};VS.forEach(v=>{const cs=getConds(v);v.cal.forEach(c=>cs.forEach((_,i)=>{s[`${v.id}__${c}__${i}`]=true;}));});return s;};
const fmtW=w=>{if(!w)return"—";const[y,wk]=w.split("-W");return`Sem. ${wk} — ${y}`;};
const ADMIN="Garrigues2040!";
const CATS=["Tous","Pomme de terre","Échalote","Oignon","Ail"];
const SUBCOLS=["#E8401C","#1B3A6B","#16A34A","#F5A623","#8B5CF6"];
const SUBLBL=["A","B","C","D","E"];

// ── 3 bins séparés — zéro conflit ────────────────────
const KEY="$2a$10$cKuUdmXcnO1I4JQciCfecer5o2jnvY2nRDiIpGdBEmwGPXafG/5wi";
const BINS={
  clients:"69f86b6f856a682189a41f71",
  tarifs: "6a291749da38895dfea5200f",
  stock:  "6a291762f5f4af5e29d6a80d",
};
const binUrl=name=>`https://api.jsonbin.io/v3/b/${BINS[name]}`;
const headers={"Content-Type":"application/json","X-Master-Key":KEY};

const api={
  async loadClients(){
    try{
      const r=await fetch(`${binUrl("clients")}/latest`,{headers:{"X-Master-Key":KEY}});
      const d=await r.json();
      return d.record?.clients||d.record||{};
    }catch{return{};}
  },
  async saveClients(data){
    try{await fetch(binUrl("clients"),{method:"PUT",headers,body:JSON.stringify(data)});}
    catch(e){console.error("saveClients",e);}
  },
  async loadTarifs(){
    try{
      const r=await fetch(`${binUrl("tarifs")}/latest`,{headers:{"X-Master-Key":KEY}});
      const d=await r.json();
      // Peu importe le format stocké, on extrait toujours les tarifs
      const rec=d.record;
      if(!rec)return {};
      // Si c'est {tarifs:{...}} on prend rec.tarifs, sinon rec directement
      return rec.tarifs||rec;
    }catch{return{};}
  },
  async saveTarifs(data){
    // On sauvegarde toujours dans le même format : l'objet tarifs directement
    try{await fetch(binUrl("tarifs"),{method:"PUT",headers,body:JSON.stringify(data)});}
    catch(e){console.error("saveTarifs",e);}
  },
  async loadStock(){
    try{
      const r=await fetch(`${binUrl("stock")}/latest`,{headers:{"X-Master-Key":KEY}});
      const d=await r.json();
      const rec=d.record;
      if(!rec)return {};
      return rec.stock||rec;
    }catch{return{};}
  },
  async saveStock(data){
    try{await fetch(binUrl("stock"),{method:"PUT",headers,body:JSON.stringify(data)});}
    catch(e){console.error("saveStock",e);}
  },
};

const QI=({qty,onChange,color})=>{
  const[d,setD]=useState(String(qty));
  useEffect(()=>setD(String(qty)),[qty]);
  const cm=()=>{const n=parseInt(d,10);if(!isNaN(n)&&n>=0){onChange(n);setD(String(n));}else setD(String(qty));};
  const ic=delta=>{const n=Math.max(0,qty+delta);onChange(n);setD(String(n));};
  return(
    <div style={{display:"flex",alignItems:"center",gap:4}}>
      <button onClick={e=>{e.stopPropagation();ic(-1);}} style={{width:28,height:28,borderRadius:"50%",border:`1.5px solid ${C.lgray}`,background:C.white,cursor:"pointer",fontWeight:700,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>−</button>
      <input value={d} onChange={e=>setD(e.target.value)} onBlur={cm} onKeyDown={e=>e.key==="Enter"&&cm()}
        style={{width:40,height:28,textAlign:"center",borderRadius:7,border:`1.5px solid ${color||C.lgray}`,fontSize:13,fontWeight:700,outline:"none",color:C.navy,padding:0,boxSizing:"border-box"}}/>
      <button onClick={e=>{e.stopPropagation();ic(1);}} style={{width:28,height:28,borderRadius:"50%",border:`1.5px solid ${color||C.lgray}`,background:C.white,cursor:"pointer",fontWeight:700,fontSize:16,color:color||C.text,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
    </div>
  );
};

export default function App(){
  // ── TOUS LES HOOKS EN PREMIER ─────────────────────────
  const[page,setPage]=useState("splash");
  const[authTab,setAuthTab]=useState("login");
  const[code1,setCode1]=useState("");
  const[code2,setCode2]=useState("");
  const[authErr,setAuthErr]=useState("");
  const[uid,setUid]=useState(null);
  const[db,setDb]=useState({});
  const[tarifs,setTarifs]=useState(mkT);
  const[stock,setStock]=useState(mkS);
  const[catF,setCatF]=useState("Tous");
  const[srch,setSrch]=useState("");
  const[selCal,setSelCal]=useState({});
  const[cart,setCart]=useState({});
  const[addTo,setAddTo]=useState(null);
  const[adminOk,setAdminOk]=useState(false);
  const[adminPw,setAdminPw]=useState("");
  const[adminErr,setAdminErr]=useState(false);
  const[adminTab,setAdminTab]=useState("tarifs");
  const[msgs,setMsgs]=useState([{r:"a",t:"Bonjour 👋 Je suis le conseiller Garrigues Frères. Posez-moi vos questions !"}]);
  const[chatIn,setChatIn]=useState("");
  const[chatLoad,setChatLoad]=useState(false);
  const[deliv,setDeliv]=useState({entreprise:"",prenom:"",adresse:"",tel:"",email:"",semaine:""});
  const[editO,setEditO]=useState(null);
  const[fiche,setFiche]=useState(null);
  const chatRef=useRef(null);
  const pollClientsRef=useRef(null);
  const pollTSRef=useRef(null);

  const me=uid?(db[uid]||{profile:null,orders:[]}):{profile:null,orders:[]};
  const profile=me.profile;
  const orders=me.orders||[];

  // ── Init : charge les 3 bins en parallèle ────────────
  useEffect(()=>{
    Promise.all([api.loadClients(),api.loadTarifs(),api.loadStock()]).then(([c,t,s])=>{
      setDb(c||{});
      setTarifs({...mkT(),...(t||{})});
      setStock({...mkS(),...(s||{})});
      setPage("login");
    });
    // Poll commandes toutes les 5s (tout le monde)
    pollClientsRef.current=setInterval(()=>{
      api.loadClients().then(c=>{
        setDb(prev=>{
          const merged={...(c||{})};
          Object.keys(prev).forEach(k=>{
            if((prev[k]?.orders||[]).length>(merged[k]?.orders||[]).length) merged[k]=prev[k];
          });
          return merged;
        });
      });
    },5000);
    return()=>clearInterval(pollClientsRef.current);
  },[]);

  // Poll tarifs+stock toutes les 5s — clients uniquement (pas admin)
  useEffect(()=>{
    clearInterval(pollTSRef.current);
    if(!uid||adminOk) return;
    pollTSRef.current=setInterval(()=>{
      api.loadTarifs().then(t=>{ if(t) setTarifs({...mkT(),...t}); });
      api.loadStock().then(s=>{ if(s) setStock({...mkS(),...s}); });
    },5000);
    return()=>clearInterval(pollTSRef.current);
  },[uid,adminOk]);

  // ── Mutators ──────────────────────────────────────────
  const mutate=useCallback((id,fn)=>{
    setDb(prev=>{
      const cur=prev[id]||{profile:null,orders:[]};
      const updated=fn(cur);
      const nxt={...prev,[id]:updated};
      api.saveClients(nxt);
      return nxt;
    });
  },[]);

  const setOrders=useCallback(async upd=>{
    if(!uid)return;
    mutate(uid,cur=>({...cur,orders:typeof upd==="function"?upd(cur.orders||[]):upd}));
  },[uid,mutate]);

  const saveProfile=useCallback(async pf=>{
    if(!uid)return;
    mutate(uid,cur=>({...cur,profile:pf}));
  },[uid,mutate]);

  // Tarifs : sauvegarde directe dans bin tarifs uniquement
  const updT=async nt=>{
    setTarifs(nt);
    await api.saveTarifs(nt);
  };

  // Stock : sauvegarde directe dans bin stock uniquement
  const toggleStock=async key=>{
    const ns={...stock,[key]:stock[key]===false};
    setStock(ns);
    await api.saveStock(ns);
  };

  // ── Auth ──────────────────────────────────────────────
  const login=()=>{
    const c=code1.trim();
    if(!c){setAuthErr("Saisissez votre code.");return;}
    if(!db[c]){setAuthErr("Code introuvable. Créez un compte.");return;}
    setUid(c);setAuthErr("");setCode1("");setPage("catalogue");
    const pf=db[c]?.profile;
    if(pf)setDeliv({...pf,semaine:""});
  };

  const register=async()=>{
    const c=code1.trim();
    if(c.length<4){setAuthErr("Minimum 4 caractères.");return;}
    if(code1!==code2){setAuthErr("Les codes ne correspondent pas.");return;}
    try{
      const fresh=await api.loadClients();
      if(fresh&&fresh[c]){setAuthErr("Code déjà utilisé.");return;}
      const nd={...(fresh||{}),[c]:{profile:null,orders:[]}};
      await api.saveClients(nd);
      setDb(nd);setUid(c);setAuthErr("");setCode1("");setCode2("");setPage("catalogue");
    }catch{setAuthErr("Erreur de connexion. Réessayez.");}
  };

  const logout=()=>{
    setUid(null);setPage("login");setCode1("");setCode2("");
    setCart({});setAddTo(null);setFiche(null);setAdminOk(false);setAdminPw("");
  };

  // ── Cart ──────────────────────────────────────────────
  const q=srch.toLowerCase().trim();
  const filtered=VS.filter(v=>{
    const ok=catF==="Tous"||v.cat===catF;
    if(!q)return ok;
    return ok&&[v.nom,v.cycle,v.usage,v.res,v.qual,v.cat].some(f=>f.toLowerCase().includes(q));
  });
  const gCal=v=>selCal[v.id]||v.cal[0];
  const cartItems=Object.entries(cart).filter(([,q])=>q>0).map(([key,qty])=>{
    const p=key.split("__");const vid=Number(p[0]),cal=p[1],idx=Number(p[2]);
    const v=VS.find(x=>x.id===vid);if(!v)return null;
    const cs=getConds(v);if(!cs[idx])return null;
    return{key,varId:vid,cal,condIdx:idx,qty,v,cond:cs[idx],price:tarifs[key]||""};
  }).filter(Boolean);
  const cTotal=cartItems.reduce((s,it)=>{const p=parseFloat(it.price);return s+(isNaN(p)?0:p*it.qty);},0);
  const cCount=Object.values(cart).reduce((a,b)=>a+(b>0?1:0),0);
  const setQ=useCallback((k,v)=>setCart(c=>({...c,[k]:Math.max(0,v)})),[]);
  const dOk=deliv.entreprise&&deliv.prenom&&deliv.adresse&&deliv.tel&&deliv.email&&deliv.semaine;

  const submitOrder=async()=>{
    if(!cartItems.length)return;
    const pf={entreprise:deliv.entreprise,prenom:deliv.prenom,adresse:deliv.adresse,tel:deliv.tel,email:deliv.email};
    await saveProfile(pf);
    if(addTo){
      await setOrders(os=>os.map(o=>o.id===addTo?{...o,items:[...o.items,...cartItems.map(i=>({varId:i.varId,cal:i.cal,condIdx:i.condIdx,qty:i.qty}))]}:o));
      setAddTo(null);setCart({});setPage("orders");return;
    }
    const newItems=cartItems.map(i=>({varId:i.varId,cal:i.cal,condIdx:i.condIdx,qty:i.qty,_sub:1}));
    const existing=(me.orders||[]).find(o=>o.status==="en attente"&&o.semaine===deliv.semaine&&o.client?.adresse===deliv.adresse);
    if(existing){
      await setOrders(os=>os.map(o=>{
        if(o.id!==existing.id)return o;
        const nextSub=(o.subCount||1)+1;
        return{...o,subCount:nextSub,items:[...o.items,...newItems.map(it=>({...it,_sub:nextSub}))]};
      }));
    }else{
      await setOrders(os=>[...os,{id:`CMD-${Date.now()}`,date:new Date().toLocaleDateString("fr-FR"),items:newItems,status:"en attente",semaine:deliv.semaine,subCount:1,client:pf}]);
    }
    setCart({});setPage("orders");
  };

  const saveEdit=async()=>{
    if(!editO)return;
    await setOrders(os=>os.map(o=>o.id===editO.id?{...o,semaine:editO.semaine,client:{...o.client,adresse:editO.adresse},items:editO.items}:o));
    setEditO(null);
  };
  const updItem=(idx,field,val)=>setEditO(e=>({...e,items:e.items.map((it,i)=>i===idx?{...it,[field]:field==="qty"?Math.max(1,parseInt(val)||1):val}:it)}));
  const delItem=idx=>setEditO(e=>({...e,items:e.items.filter((_,i)=>i!==idx)}));

  const sendChat=async()=>{
    if(!chatIn.trim()||chatLoad)return;
    const msg=chatIn.trim();setChatIn("");setMsgs(p=>[...p,{r:"u",t:msg}]);setChatLoad(true);
    try{
      const sys=`Tu es le conseiller Garrigues Frères SAS. Catalogue: ${VS.map(v=>`${v.nom}(${v.cat}): ${v.usage}, ${v.cycle}`).join("|")}. Réponds en français, professionnel.`;
      const hist=msgs.slice(-6).map(m=>({role:m.r==="a"?"assistant":"user",content:m.t}));
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sys,messages:[...hist,{role:"user",content:msg}]})});
      const data=await res.json();
      setMsgs(p=>[...p,{r:"a",t:data.content?.map(b=>b.text||"").join("")||"Désolé, erreur."}]);
    }catch{setMsgs(p=>[...p,{r:"a",t:"Erreur de connexion."}]);}
    setChatLoad(false);
  };

  const Hdr=({title,onBack})=>(
    <div style={{background:`linear-gradient(135deg,${C.navy},#0d2347)`,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
      <button onClick={onBack} style={{background:"rgba(255,255,255,.18)",border:"1.5px solid rgba(255,255,255,.3)",color:C.white,cursor:"pointer",borderRadius:10,padding:"7px 13px",fontSize:13,fontWeight:700,flexShrink:0}}>← Retour</button>
      <BN s={20}/>
      {title&&<span style={{color:"rgba(255,255,255,.55)",fontSize:11,marginLeft:2}}>{title}</span>}
    </div>
  );

  // ── SPLASH ────────────────────────────────────────────
  if(page==="splash")return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:430,margin:"0 auto",minHeight:"100vh",background:`linear-gradient(160deg,${C.navy},#0d2347)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center",color:C.white}}><BN s={44}/><p style={{opacity:.5,fontSize:13,marginTop:8}}>Chargement…</p></div>
    </div>
  );

  // ── LOGIN ─────────────────────────────────────────────
  if(!uid)return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:430,margin:"0 auto",minHeight:"100vh",background:`linear-gradient(160deg,${C.navy},#0d2347)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28}}>
      <BN s={40}/><p style={{color:"rgba(255,255,255,.5)",fontSize:12,margin:"6px 0 32px",fontStyle:"italic"}}>Catalogue semences 2026</p>
      <div style={{width:"100%",background:"rgba(255,255,255,.07)",borderRadius:16,padding:24,border:"1.5px solid rgba(255,255,255,.15)"}}>
        <div style={{display:"flex",marginBottom:20,borderRadius:10,overflow:"hidden",border:"1.5px solid rgba(255,255,255,.2)"}}>
          {[["login","Se connecter"],["register","Créer un compte"]].map(([s,l])=>(
            <button key={s} onClick={()=>{setAuthTab(s);setAuthErr("");setCode1("");setCode2("");}}
              style={{flex:1,padding:"10px 0",border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:authTab===s?"rgba(255,255,255,.2)":"transparent",color:C.white}}>{l}</button>
          ))}
        </div>
        {authTab==="login"&&(<>
          <p style={{color:"rgba(255,255,255,.6)",fontSize:12,margin:"0 0 12px",textAlign:"center"}}>Saisissez votre code personnel.</p>
          <label style={{fontSize:11,color:"rgba(255,255,255,.55)",display:"block",marginBottom:3}}>Votre code</label>
          <input value={code1} onChange={e=>setCode1(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="Ex : MON-CODE-2026"
            style={{width:"100%",padding:"11px 14px",borderRadius:10,border:"1.5px solid rgba(255,255,255,.25)",background:"rgba(255,255,255,.1)",color:C.white,fontSize:14,boxSizing:"border-box",outline:"none",marginBottom:8}}/>
          {authErr&&<p style={{color:"#FCA5A5",fontSize:12,margin:"0 0 6px"}}>{authErr}</p>}
          <button onClick={login} style={{width:"100%",padding:12,borderRadius:12,border:"none",background:C.red,color:C.white,fontWeight:700,fontSize:14,cursor:"pointer"}}>Connexion</button>
        </>)}
        {authTab==="register"&&(<>
          <p style={{color:"rgba(255,255,255,.6)",fontSize:12,margin:"0 0 12px",textAlign:"center"}}>Choisissez un code unique (min. 4 caractères).</p>
          <label style={{fontSize:11,color:"rgba(255,255,255,.55)",display:"block",marginBottom:3}}>Choisissez un code</label>
          <input value={code1} onChange={e=>setCode1(e.target.value)} placeholder="Ex : MON-CODE-2026"
            style={{width:"100%",padding:"11px 14px",borderRadius:10,border:"1.5px solid rgba(255,255,255,.25)",background:"rgba(255,255,255,.1)",color:C.white,fontSize:14,boxSizing:"border-box",outline:"none",marginBottom:10}}/>
          <label style={{fontSize:11,color:"rgba(255,255,255,.55)",display:"block",marginBottom:3}}>Confirmez le code</label>
          <input value={code2} onChange={e=>setCode2(e.target.value)} onKeyDown={e=>e.key==="Enter"&&register()} placeholder="Répétez votre code"
            style={{width:"100%",padding:"11px 14px",borderRadius:10,border:"1.5px solid rgba(255,255,255,.25)",background:"rgba(255,255,255,.1)",color:C.white,fontSize:14,boxSizing:"border-box",outline:"none",marginBottom:8}}/>
          {authErr&&<p style={{color:"#FCA5A5",fontSize:12,margin:"0 0 6px"}}>{authErr}</p>}
          <button onClick={register} style={{width:"100%",padding:12,borderRadius:12,border:"none",background:C.green,color:C.white,fontWeight:700,fontSize:14,cursor:"pointer"}}>Créer mon compte</button>
        </>)}
      </div>
    </div>
  );

  // ── FICHE ─────────────────────────────────────────────
  if(page==="fiche"&&fiche){
    const v=fiche;const m=CAT[v.cat];const gc=gCal(v);const cs=getConds(v);
    const varDispo=v.cal.some(c=>cs.some((_,i)=>stock[`${v.id}__${c}__${i}`]!==false));
    return(
      <div style={{fontFamily:"system-ui,sans-serif",maxWidth:430,margin:"0 auto",minHeight:"100vh",background:C.light,display:"flex",flexDirection:"column"}}>
        <Hdr title={v.nom} onBack={()=>setPage("catalogue")}/>
        <div style={{background:m.l,borderBottom:`3px solid ${m.c}`,padding:"14px 16px",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <span style={{fontSize:44}}>{m.e}</span>
            <div>
              <h1 style={{margin:0,fontSize:20,fontWeight:900,color:C.navy}}>{v.nom}</h1>
              <span style={{background:m.c,color:C.white,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>{v.cat}</span>
              <span style={{marginLeft:6,background:varDispo?"#DCFCE7":"#FEE2E2",color:varDispo?C.green:C.red,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>{varDispo?"● Disponible":"● Rupture totale"}</span>
            </div>
          </div>
        </div>
        <div style={{padding:14,flex:1,overflowY:"auto"}}>
          {[["⏱ Cycle",v.cycle],["🌾 Usage",v.usage],["🛡 Résistance",v.res],["👅 Qualité",v.qual]].map(([k,val])=>(
            <div key={k} style={{background:C.white,borderRadius:10,padding:"9px 13px",marginBottom:6,boxShadow:"0 1px 3px #0001"}}>
              <div style={{fontSize:11,color:C.gray}}>{k}</div>
              <div style={{fontSize:14,fontWeight:600,color:C.text}}>{val}</div>
            </div>
          ))}
          <h3 style={{color:C.navy,margin:"14px 0 8px",fontSize:14}}>📦 Calibre & Conditionnements</h3>
          {v.cal.length>1&&(
            <div style={{marginBottom:10}}>
              <div style={{fontSize:11,color:C.gray,marginBottom:5}}>Choisissez un calibre :</div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                {v.cal.map(c=>(
                  <button key={c} onClick={()=>setSelCal(s=>({...s,[v.id]:c}))}
                    style={{padding:"6px 16px",borderRadius:20,border:`2px solid ${gc===c?m.c:C.lgray}`,background:gc===c?m.l:C.white,color:gc===c?m.c:C.gray,fontWeight:700,fontSize:12,cursor:"pointer"}}>{c}</button>
                ))}
              </div>
            </div>
          )}
          {cs.map((cond,i)=>{
            const key=`${v.id}__${gc}__${i}`;const price=tarifs[key]||"";const qty=cart[key]||0;const dispo=stock[key]!==false;
            return(
              <div key={i} style={{background:C.white,borderRadius:12,padding:"11px 13px",marginBottom:7,boxShadow:"0 1px 3px #0001",display:"flex",alignItems:"center",gap:8,opacity:dispo?1:0.5}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontWeight:700,fontSize:13,color:C.text}}>{cond.t}</span>
                    {!dispo&&<span style={{background:"#FEE2E2",color:C.red,borderRadius:20,fontSize:9,padding:"2px 7px",fontWeight:700}}>Rupture</span>}
                  </div>
                  <div style={{fontSize:11,color:price?m.c:C.gray,fontWeight:price?700:400}}>{price?`${parseFloat(price).toFixed(2)} €/u`:"Prix sur demande"}</div>
                </div>
                {dispo?<QI qty={qty} onChange={n=>setQ(key,n)} color={m.c}/>
                  :<span style={{fontSize:11,color:C.red,fontWeight:700}}>Indisponible</span>}
              </div>
            );
          })}
          {cCount>0&&<button onClick={()=>setPage("cart")} style={{width:"100%",marginTop:8,padding:13,borderRadius:12,border:"none",fontWeight:800,fontSize:14,cursor:"pointer",background:C.red,color:C.white}}>🛒 Voir ma sélection ({cCount})</button>}
        </div>
      </div>
    );
  }

  // ── EDIT ORDER ────────────────────────────────────────
  if(editO)return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:430,margin:"0 auto",minHeight:"100vh",background:C.light,display:"flex",flexDirection:"column"}}>
      <Hdr title="Modifier la commande" onBack={()=>setEditO(null)}/>
      <div style={{padding:14,flex:1,overflowY:"auto"}}>
        <h3 style={{color:C.navy,margin:"0 0 10px",fontSize:14}}>🚚 Livraison</h3>
        <div style={{marginBottom:8}}>
          <label style={{fontSize:11,color:C.gray,display:"block",marginBottom:2}}>Adresse de livraison</label>
          <input value={editO.adresse} onChange={e=>setEditO(o=>({...o,adresse:e.target.value}))}
            style={{width:"100%",padding:"8px 11px",borderRadius:9,border:`1.5px solid ${C.lgray}`,fontSize:13,boxSizing:"border-box",outline:"none"}}/>
        </div>
        <div style={{marginBottom:12}}>
          <label style={{fontSize:11,color:C.gray,display:"block",marginBottom:2}}>Semaine de livraison</label>
          <input type="week" value={editO.semaine} onChange={e=>setEditO(o=>({...o,semaine:e.target.value}))}
            style={{width:"100%",padding:"8px 11px",borderRadius:9,border:`1.5px solid ${C.lgray}`,fontSize:13,boxSizing:"border-box",outline:"none"}}/>
        </div>
        <h3 style={{color:C.navy,margin:"0 0 10px",fontSize:14}}>📦 Articles</h3>
        {editO.items.map((it,idx)=>{
          const v=VS.find(x=>x.id===it.varId);if(!v)return null;
          const m=CAT[v.cat];const cs=getConds(v);
          return(
            <div key={idx} style={{background:C.white,borderRadius:12,padding:"12px 13px",marginBottom:8,boxShadow:"0 1px 3px #0001"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span style={{fontWeight:700,color:C.navy,fontSize:13}}>{m.e} {v.nom}</span>
                <button onClick={()=>delItem(idx)} style={{background:"#FEE2E2",border:"none",color:C.red,borderRadius:7,padding:"3px 8px",fontSize:11,cursor:"pointer",fontWeight:700}}>✕</button>
              </div>
              <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                <div style={{flex:1,minWidth:100}}>
                  <label style={{fontSize:10,color:C.gray,display:"block",marginBottom:2}}>Variété</label>
                  <select value={it.varId} onChange={e=>{const nv=VS.find(x=>x.id===Number(e.target.value));if(!nv)return;setEditO(o=>({...o,items:o.items.map((x,i)=>i===idx?{...x,varId:nv.id,cal:nv.cal[0],condIdx:0}:x)}));}}
                    style={{width:"100%",padding:"6px 8px",borderRadius:8,border:`1.5px solid ${C.lgray}`,fontSize:12,outline:"none"}}>
                    {VS.filter(x=>x.cat===v.cat).map(x=><option key={x.id} value={x.id}>{x.nom}</option>)}
                  </select>
                </div>
                <div style={{flex:1,minWidth:80}}>
                  <label style={{fontSize:10,color:C.gray,display:"block",marginBottom:2}}>Calibre</label>
                  <select value={it.cal} onChange={e=>updItem(idx,"cal",e.target.value)}
                    style={{width:"100%",padding:"6px 8px",borderRadius:8,border:`1.5px solid ${C.lgray}`,fontSize:12,outline:"none"}}>
                    {v.cal.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{display:"flex",gap:8,alignItems:"flex-end",flexWrap:"wrap"}}>
                <div style={{flex:1,minWidth:110}}>
                  <label style={{fontSize:10,color:C.gray,display:"block",marginBottom:2}}>Conditionnement</label>
                  <select value={it.condIdx} onChange={e=>updItem(idx,"condIdx",Number(e.target.value))}
                    style={{width:"100%",padding:"6px 8px",borderRadius:8,border:`1.5px solid ${C.lgray}`,fontSize:12,outline:"none"}}>
                    {cs.map((c,i)=><option key={i} value={i}>{c.t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{fontSize:10,color:C.gray,display:"block",marginBottom:2}}>Quantité</label>
                  <QI qty={it.qty} onChange={n=>updItem(idx,"qty",n)} color={m.c}/>
                </div>
              </div>
            </div>
          );
        })}
        <button onClick={saveEdit} style={{width:"100%",padding:13,borderRadius:12,border:"none",fontWeight:800,fontSize:14,cursor:"pointer",background:C.green,color:C.white,marginTop:4}}>✅ Enregistrer</button>
      </div>
    </div>
  );

  // ── HOME ──────────────────────────────────────────────
  if(page==="home")return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:430,margin:"0 auto",minHeight:"100vh",background:`linear-gradient(160deg,${C.navy},#0d2347 60%,#111827)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28}}>
      <BN s={42}/>
      {profile&&<p style={{color:"rgba(255,255,255,.6)",fontSize:12,margin:"6px 0 4px"}}>Bonjour <strong style={{color:C.orange}}>{profile.prenom}</strong> 👋</p>}
      <p style={{color:"rgba(255,255,255,.4)",fontSize:11,margin:"0 0 30px",fontStyle:"italic"}}>Catalogue semences 2026</p>
      {[["🥔  Catalogue & commande","catalogue"],["📦  Mes commandes","orders"],["💬  Conseiller IA","chat"],["⚙️  Administration","admin"]].map(([l,p])=>(
        <button key={p} onClick={()=>setPage(p)} style={{width:"100%",padding:"15px 20px",borderRadius:14,border:"1.5px solid rgba(255,255,255,.15)",background:"rgba(255,255,255,.06)",color:C.white,fontSize:15,fontWeight:700,cursor:"pointer",marginBottom:10,textAlign:"left"}}>
          {l}{p==="orders"&&orders.length>0&&<span style={{background:C.orange,color:C.white,borderRadius:20,padding:"1px 8px",fontSize:11,marginLeft:8}}>{orders.length}</span>}
        </button>
      ))}
      <button onClick={logout} style={{marginTop:10,background:"none",border:"1.5px solid rgba(255,255,255,.2)",color:"rgba(255,255,255,.5)",borderRadius:10,padding:"8px 20px",fontSize:12,cursor:"pointer"}}>Déconnexion</button>
    </div>
  );

  // ── ADMIN ─────────────────────────────────────────────
  if(page==="admin"){
    if(!adminOk)return(
      <div style={{fontFamily:"system-ui,sans-serif",maxWidth:430,margin:"0 auto",minHeight:"100vh",background:C.light,display:"flex",flexDirection:"column"}}>
        <Hdr title="Administration" onBack={()=>setPage("home")}/>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28}}>
          <div style={{fontSize:36,marginBottom:10}}>🔒</div>
          <h2 style={{color:C.navy,marginBottom:18,fontSize:18}}>Espace Administration</h2>
          <input type="password" value={adminPw} onChange={e=>setAdminPw(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"){if(adminPw===ADMIN){setAdminOk(true);setAdminErr(false);}else setAdminErr(true);}}}
            placeholder="Mot de passe" style={{width:"100%",padding:"11px 14px",borderRadius:10,border:`2px solid ${adminErr?C.red:C.lgray}`,fontSize:14,boxSizing:"border-box",outline:"none",marginBottom:8}}/>
          {adminErr&&<p style={{color:C.red,fontSize:12,margin:"0 0 8px"}}>Mot de passe incorrect</p>}
          <button onClick={()=>{if(adminPw===ADMIN){setAdminOk(true);setAdminErr(false);}else setAdminErr(true);}}
            style={{width:"100%",padding:12,borderRadius:12,border:"none",background:C.navy,color:C.white,fontWeight:700,fontSize:14,cursor:"pointer"}}>Connexion</button>
        </div>
      </div>
    );
    const allOrders=Object.entries(db).flatMap(([code,d])=>(d.orders||[]).map(o=>({...o,_code:code})));
    return(
      <div style={{fontFamily:"system-ui,sans-serif",maxWidth:430,margin:"0 auto",minHeight:"100vh",background:C.light,display:"flex",flexDirection:"column"}}>
        <Hdr title="Administration" onBack={()=>{setPage("home");setAdminOk(false);setAdminPw("");}}/>
        <div style={{display:"flex",borderBottom:`2px solid ${C.lgray}`,background:C.white,flexShrink:0,overflowX:"auto"}}>
          {[["tarifs","💰 Tarifs"],["stock","📦 Stock"],["commandes","🧾 Commandes"]].map(([t,l])=>(
            <button key={t} onClick={()=>setAdminTab(t)} style={{flex:1,padding:"11px 8px",border:"none",borderBottom:`3px solid ${adminTab===t?C.red:"transparent"}`,background:"none",fontWeight:700,fontSize:11,color:adminTab===t?C.red:C.gray,cursor:"pointer",whiteSpace:"nowrap"}}>{l}</button>
          ))}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:14}}>
          {adminTab==="tarifs"&&(<>
            <p style={{color:C.gray,fontSize:12,margin:"0 0 10px"}}>Prix sauvegardés instantanément. Clients mis à jour toutes les 5s.</p>
            {VS.map(v=>{const cs=getConds(v);return(
              <div key={v.id} style={{background:C.white,borderRadius:12,padding:"12px 14px",marginBottom:8,boxShadow:"0 1px 3px #0001"}}>
                <div style={{fontWeight:700,color:C.navy,marginBottom:8,fontSize:13}}>{CAT[v.cat].e} {v.nom}</div>
                {v.cal.map(c=>(
                  <div key={c} style={{marginBottom:8}}>
                    {v.cal.length>1&&<div style={{fontSize:10,color:C.gray,fontWeight:700,marginBottom:4,textTransform:"uppercase"}}>Calibre {c}</div>}
                    {cs.map((cond,i)=>{const k=`${v.id}__${c}__${i}`;return(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                        <span style={{flex:1,fontSize:12,color:C.text}}>{cond.t}</span>
                        <input value={tarifs[k]||""} onChange={e=>updT({...tarifs,[k]:e.target.value})}
                          placeholder="—" type="number" min="0" step="0.01"
                          style={{width:76,padding:"5px 7px",borderRadius:8,border:`1.5px solid ${C.lgray}`,fontSize:12,outline:"none",textAlign:"right"}}/>
                        <span style={{fontSize:11,color:C.gray}}>€</span>
                      </div>
                    );})}
                  </div>
                ))}
              </div>
            );})}
          </>)}
          {adminTab==="stock"&&(<>
            <p style={{color:C.gray,fontSize:12,margin:"0 0 12px"}}>Gérez la disponibilité par calibre et conditionnement.</p>
            {["Pomme de terre","Échalote","Oignon","Ail"].map(cat=>(
              <div key={cat} style={{marginBottom:16}}>
                <div style={{fontWeight:700,color:C.navy,fontSize:13,marginBottom:8}}>{CAT[cat].e} {cat}</div>
                {VS.filter(v=>v.cat===cat).map(v=>{
                  const cs=getConds(v);
                  return(
                    <div key={v.id} style={{background:C.white,borderRadius:12,padding:"12px 14px",marginBottom:8,boxShadow:"0 1px 3px #0001"}}>
                      <div style={{fontWeight:700,color:C.navy,marginBottom:8,fontSize:13}}>{v.nom}</div>
                      {v.cal.map(c=>(
                        <div key={c} style={{marginBottom:8}}>
                          {v.cal.length>1&&<div style={{fontSize:10,color:C.gray,fontWeight:700,marginBottom:4,textTransform:"uppercase"}}>Calibre {c}</div>}
                          {cs.map((cond,i)=>{
                            const key=`${v.id}__${c}__${i}`;const dispo=stock[key]!==false;
                            return(
                              <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5,padding:"6px 10px",borderRadius:8,background:dispo?"#F0FDF4":"#FEF2F2",border:`1px solid ${dispo?"#BBF7D0":"#FECACA"}`}}>
                                <div>
                                  <span style={{fontSize:12,fontWeight:600,color:C.text}}>{cond.t}</span>
                                  <span style={{marginLeft:8,fontSize:11,color:dispo?C.green:C.red,fontWeight:700}}>{dispo?"● Dispo":"● Rupture"}</span>
                                </div>
                                <button onClick={()=>toggleStock(key)}
                                  style={{padding:"4px 12px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,background:dispo?"#FEE2E2":"#DCFCE7",color:dispo?C.red:C.green}}>
                                  {dispo?"Rupture":"Remettre"}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </>)}
          {adminTab==="commandes"&&(
            allOrders.length===0?<p style={{color:C.gray,textAlign:"center",padding:40}}>Aucune commande.</p>
            :allOrders.map(o=>{
              const updS=async e=>{
                const s=e.target.value;
                const fresh=await api.loadClients();
                const upd={...fresh};
                if(upd[o._code]){
                  upd[o._code]={...upd[o._code],orders:(upd[o._code].orders||[]).map(x=>x.id===o.id?{...x,status:s}:x)};
                }
                await api.saveClients(upd);
                setDb(upd);
              };
              const subs=o.subCount||1;
              return(
                <div key={o.id} style={{background:C.white,borderRadius:12,padding:14,marginBottom:10,boxShadow:"0 1px 3px #0001"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <span style={{fontWeight:700,color:C.navy,fontSize:13}}>{o.id}</span>
                    <select value={o.status} onChange={updS} style={{padding:"3px 8px",borderRadius:8,border:`1.5px solid ${C.lgray}`,fontSize:11,color:o.status==="expédié"?C.green:C.orange,fontWeight:700,cursor:"pointer"}}>
                      <option value="en attente">⏳ En attente</option>
                      <option value="expédié">✅ Expédié</option>
                    </select>
                  </div>
                  <div style={{fontSize:11,color:C.gray,marginBottom:2}}>📅 {o.date} · {o.client?.entreprise} · {o.client?.prenom}</div>
                  <div style={{fontSize:11,color:C.gray,marginBottom:2}}>📍 {o.client?.adresse} · ✉️ {o.client?.email}</div>
                  <div style={{fontSize:11,color:C.navy,fontWeight:700,marginBottom:6}}>🚚 {fmtW(o.semaine)}</div>
                  {subs>1&&<div style={{fontSize:11,color:C.white,background:C.navy,borderRadius:20,padding:"2px 10px",display:"inline-block",marginBottom:6}}>{subs} commandes groupées</div>}
                  {o.items.map((it,idx)=>{const v=VS.find(x=>x.id===it.varId);const cd=getConds(v)[it.condIdx];const sc=SUBCOLS[((it._sub||1)-1)%SUBCOLS.length];const sl=SUBLBL[((it._sub||1)-1)%SUBLBL.length];return(
                    <div key={idx} style={{fontSize:12,color:C.text,padding:"2px 0",display:"flex",alignItems:"center",gap:6}}>
                      {subs>1&&<span style={{width:18,height:18,borderRadius:"50%",background:sc,color:C.white,fontSize:9,fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{sl}</span>}
                      {v?.nom} — cal.{it.cal} — {cd?.t} × {it.qty}
                    </div>
                  );})}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  // ── ORDERS ────────────────────────────────────────────
  if(page==="orders")return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:430,margin:"0 auto",minHeight:"100vh",background:C.light,display:"flex",flexDirection:"column"}}>
      <Hdr title="Mes commandes" onBack={()=>setPage("home")}/>
      <div style={{padding:14,flex:1,overflowY:"auto"}}>
        {orders.length===0?(
          <div style={{textAlign:"center",padding:"40px 0",color:C.gray}}>
            <div style={{fontSize:40}}>📭</div><p style={{margin:"8px 0 16px"}}>Aucune commande.</p>
            <button onClick={()=>setPage("catalogue")} style={{background:C.navy,color:C.white,border:"none",borderRadius:10,padding:"10px 20px",cursor:"pointer",fontWeight:700}}>Voir le catalogue</button>
          </div>
        ):orders.map(o=>{
          const subs=o.subCount||1;
          return(
            <div key={o.id} style={{background:C.white,borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 1px 5px #0001"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <span style={{fontWeight:800,color:C.navy,fontSize:13}}>{o.id}</span>
                <span style={{fontSize:11,fontWeight:700,color:o.status==="expédié"?C.green:C.orange,background:o.status==="expédié"?"#F0FDF4":"#FFF7ED",padding:"3px 10px",borderRadius:20}}>
                  {o.status==="expédié"?"✅ Expédié":"⏳ En attente"}
                </span>
              </div>
              {subs>1&&<div style={{marginBottom:6,display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>
                <span style={{fontSize:11,color:C.gray}}>Groupée :</span>
                {Array.from({length:subs},(_,i)=>(
                  <span key={i} style={{width:20,height:20,borderRadius:"50%",background:SUBCOLS[i%SUBCOLS.length],color:C.white,fontSize:10,fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center"}}>{SUBLBL[i]}</span>
                ))}
              </div>}
              <div style={{fontSize:11,color:C.gray,marginBottom:3}}>📅 {o.date}</div>
              <div style={{fontSize:12,color:C.navy,fontWeight:700,marginBottom:4,background:"#EEF2FF",borderRadius:8,padding:"5px 10px",display:"inline-block"}}>🚚 {fmtW(o.semaine)}</div>
              <div style={{fontSize:11,color:C.gray,marginBottom:6}}>📍 {o.client?.adresse}</div>
              {o.items.map((it,idx)=>{
                const v=VS.find(x=>x.id===it.varId);const cd=getConds(v)[it.condIdx];
                const sc=SUBCOLS[((it._sub||1)-1)%SUBCOLS.length];const sl=SUBLBL[((it._sub||1)-1)%SUBLBL.length];
                return(
                  <div key={idx} style={{fontSize:12,color:C.text,padding:"2px 0",display:"flex",alignItems:"center",gap:6}}>
                    {subs>1&&<span style={{width:18,height:18,borderRadius:"50%",background:sc,color:C.white,fontSize:9,fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{sl}</span>}
                    {v?.nom} — cal. {it.cal} — {cd?.t} × {it.qty}
                  </div>
                );
              })}
              {o.status==="en attente"&&(
                <div style={{display:"flex",gap:8,marginTop:10}}>
                  <button onClick={()=>{setAddTo(o.id);setCart({});setPage("catalogue");}}
                    style={{flex:1,padding:"8px",borderRadius:10,border:`1.5px solid ${C.navy}`,background:"#fff",color:C.navy,fontWeight:700,fontSize:12,cursor:"pointer"}}>➕ Ajouter</button>
                  <button onClick={()=>setEditO({...o,adresse:o.client?.adresse||""})}
                    style={{flex:1,padding:"8px",borderRadius:10,border:`1.5px solid ${C.orange}`,background:"#FFF7ED",color:C.orange,fontWeight:700,fontSize:12,cursor:"pointer"}}>✏️ Modifier</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── CART ──────────────────────────────────────────────
  if(page==="cart")return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:430,margin:"0 auto",minHeight:"100vh",background:C.light,display:"flex",flexDirection:"column"}}>
      <Hdr title="Ma sélection" onBack={()=>setPage("catalogue")}/>
      <div style={{padding:14,flex:1,overflowY:"auto"}}>
        {addTo&&<div style={{background:"#FFF7ED",border:`1.5px solid ${C.orange}`,borderRadius:10,padding:"9px 13px",marginBottom:10,fontSize:12,color:C.text}}>
          ➕ Ajout à la commande <strong>{addTo}</strong>
          <button onClick={()=>setAddTo(null)} style={{float:"right",background:"none",border:"none",color:C.red,cursor:"pointer",fontWeight:700}}>Annuler</button>
        </div>}
        {cartItems.length===0?(
          <div style={{textAlign:"center",padding:"30px 0",color:C.gray}}>
            <div style={{fontSize:40}}>🛒</div><p>Panier vide</p>
            <button onClick={()=>setPage("catalogue")} style={{background:C.navy,color:C.white,border:"none",borderRadius:10,padding:"10px 20px",cursor:"pointer",fontWeight:700}}>Catalogue</button>
          </div>
        ):(<>
          {cartItems.map(it=>{const mm=CAT[it.v.cat];return(
            <div key={it.key} style={{background:C.white,borderRadius:12,padding:"10px 13px",marginBottom:7,boxShadow:"0 1px 3px #0001",display:"flex",alignItems:"center",gap:9}}>
              <span style={{fontSize:22}}>{mm.e}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,fontSize:12,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{it.v.nom}</div>
                <div style={{fontSize:10,color:C.gray}}>Cal. {it.cal} · {it.cond?.t}{it.price?` · ${parseFloat(it.price).toFixed(2)} €/u`:""}</div>
              </div>
              <QI qty={it.qty} onChange={n=>setQ(it.key,n)} color={mm.c}/>
            </div>
          );})}
          {cTotal>0&&<div style={{background:C.navy,borderRadius:12,padding:"9px 16px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:"rgba(255,255,255,.7)",fontSize:12}}>Total estimé</span>
            <span style={{color:C.white,fontWeight:900,fontSize:17}}>{cTotal.toFixed(2)} €</span>
          </div>}
          {!addTo&&(<>
            <h3 style={{color:C.navy,margin:"12px 0 4px",fontSize:14}}>📋 Informations de livraison</h3>
            <p style={{color:C.gray,fontSize:11,margin:"0 0 8px"}}>Vérifiez et modifiez si nécessaire. <span style={{color:C.red}}>* Obligatoires</span></p>
            {[["Nom de l'entreprise","entreprise","text"],["Votre prénom","prenom","text"],["Adresse de livraison","adresse","text"],["Téléphone","tel","tel"],["Email","email","email"]].map(([lbl,fld,type])=>(
              <div key={fld} style={{marginBottom:7}}>
                <label style={{fontSize:11,color:C.gray,display:"block",marginBottom:2}}>{lbl} <span style={{color:C.red}}>*</span></label>
                <input value={deliv[fld]} onChange={e=>setDeliv(p=>({...p,[fld]:e.target.value}))} type={type}
                  style={{width:"100%",padding:"9px 12px",borderRadius:10,border:`1.5px solid ${deliv[fld]?C.green:C.red}`,fontSize:13,boxSizing:"border-box",outline:"none"}}/>
              </div>
            ))}
            <div style={{marginBottom:7}}>
              <label style={{fontSize:11,color:C.gray,display:"block",marginBottom:2}}>Semaine de livraison souhaitée <span style={{color:C.red}}>*</span></label>
              <input value={deliv.semaine} onChange={e=>setDeliv(p=>({...p,semaine:e.target.value}))} type="week"
                style={{width:"100%",padding:"9px 12px",borderRadius:10,border:`1.5px solid ${deliv.semaine?C.green:C.red}`,fontSize:13,boxSizing:"border-box",outline:"none"}}/>
            </div>
            <button onClick={submitOrder} disabled={!dOk}
              style={{width:"100%",padding:13,borderRadius:12,border:"none",fontWeight:800,fontSize:14,cursor:dOk?"pointer":"not-allowed",marginTop:4,background:dOk?C.red:"#CBD5E1",color:C.white}}>
              Confirmer la commande 🚀
            </button>
          </>)}
          {addTo&&<button onClick={submitOrder} style={{width:"100%",padding:13,borderRadius:12,border:"none",fontWeight:800,fontSize:14,cursor:"pointer",marginTop:4,background:C.red,color:C.white}}>Ajouter à la commande ➕</button>}
        </>)}
      </div>
    </div>
  );

  // ── CHAT ──────────────────────────────────────────────
  if(page==="chat")return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:430,margin:"0 auto",height:"100vh",display:"flex",flexDirection:"column",background:C.light}}>
      <Hdr title="Conseiller IA" onBack={()=>setPage("home")}/>
      <div style={{flex:1,overflowY:"auto",padding:"12px 12px 6px"}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.r==="u"?"flex-end":"flex-start",marginBottom:8}}>
            <div style={{maxWidth:"82%",padding:"9px 13px",borderRadius:m.r==="u"?"16px 16px 4px 16px":"16px 16px 16px 4px",
              background:m.r==="u"?C.navy:C.white,color:m.r==="u"?C.white:C.text,fontSize:13,lineHeight:1.5,boxShadow:"0 1px 3px #0001"}}>{m.t}</div>
          </div>
        ))}
        {chatLoad&&<div style={{display:"flex",marginBottom:8}}><div style={{background:C.white,borderRadius:"16px 16px 16px 4px",padding:"9px 14px"}}>
          <span style={{display:"inline-flex",gap:4}}>{[0,1,2].map(i=><span key={i} style={{width:6,height:6,borderRadius:"50%",background:C.orange,opacity:.5,animation:`pulse 1s ${i*.2}s infinite`}}/>)}</span>
        </div></div>}
        <div ref={chatRef}/>
      </div>
      <div style={{padding:"8px 12px 12px",background:C.white,borderTop:`1px solid ${C.lgray}`,flexShrink:0,display:"flex",gap:8}}>
        <input value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Votre question..." disabled={chatLoad}
          style={{flex:1,padding:"10px 14px",borderRadius:22,border:`1.5px solid ${C.lgray}`,fontSize:13,outline:"none"}}/>
        <button onClick={sendChat} disabled={chatLoad||!chatIn.trim()}
          style={{width:42,height:42,borderRadius:"50%",border:"none",background:(!chatIn.trim()||chatLoad)?C.lgray:C.red,color:C.white,fontSize:17,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>▶</button>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}`}</style>
    </div>
  );

  // ── CATALOGUE ─────────────────────────────────────────
  return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:430,margin:"0 auto",minHeight:"100vh",background:C.light}}>
      <div style={{background:`linear-gradient(135deg,${C.navy},#0d2347)`,padding:"10px 12px 8px",position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button onClick={()=>setPage("home")} style={{background:"rgba(255,255,255,.18)",border:"1.5px solid rgba(255,255,255,.3)",color:C.white,cursor:"pointer",borderRadius:10,padding:"6px 12px",fontSize:13,fontWeight:700,whiteSpace:"nowrap"}}>← Retour</button>
            <BN s={18}/>
          </div>
          <div style={{display:"flex",gap:7,alignItems:"center"}}>
            {addTo&&<span style={{background:C.orange,color:C.white,borderRadius:20,padding:"3px 8px",fontSize:9,fontWeight:700}}>+ ajout</span>}
            <button onClick={()=>setPage("cart")} style={{background:"rgba(255,255,255,.15)",border:"none",color:C.white,cursor:"pointer",borderRadius:10,padding:"5px 11px",fontSize:12,position:"relative",fontWeight:700}}>
              🛒{cCount>0&&<span style={{position:"absolute",top:-5,right:-5,background:C.red,borderRadius:"50%",width:16,height:16,fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{cCount}</span>}
            </button>
          </div>
        </div>
        <input value={srch} onChange={e=>setSrch(e.target.value)} placeholder="🔍 Nom, cycle, usage, résistance, qualité..."
          style={{width:"100%",padding:"8px 13px",borderRadius:22,border:"none",fontSize:12,boxSizing:"border-box",background:"rgba(255,255,255,.13)",color:C.white,outline:"none"}}/>
        <div style={{display:"flex",gap:5,marginTop:7,overflowX:"auto",paddingBottom:2}}>
          {CATS.map(c=>(
            <button key={c} onClick={()=>setCatF(c)} style={{flexShrink:0,padding:"4px 10px",borderRadius:18,border:"none",cursor:"pointer",fontWeight:700,fontSize:10,background:catF===c?C.white:"rgba(255,255,255,.14)",color:catF===c?C.navy:C.white}}>
              {c==="Tous"?c:(CAT[c]?.e+" "+c)}
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:"9px 11px"}}>
        <p style={{color:C.gray,fontSize:11,margin:"0 0 7px"}}>{filtered.length} variété(s){q?` · "${srch}"`:""}</p>
        {filtered.map(v=>{
          const m=CAT[v.cat];const cs=getConds(v);
          const inCart=v.cal.some(c=>cs.some((_,i)=>cart[`${v.id}__${c}__${i}`]>0));
          const fp=tarifs[`${v.id}__${v.cal[0]}__0`];
          const anyDispo=v.cal.some(c=>cs.some((_,i)=>stock[`${v.id}__${c}__${i}`]!==false));
          const allRupture=v.cal.every(c=>cs.every((_,i)=>stock[`${v.id}__${c}__${i}`]===false));
          return(
            <div key={v.id}
              onClick={()=>{if(!anyDispo)return;setFiche(v);setPage("fiche");}}
              style={{background:C.white,borderRadius:13,padding:"11px 13px",marginBottom:8,boxShadow:"0 1px 3px #0001",border:`2px solid ${inCart?m.c:C.lgray}`,cursor:anyDispo?"pointer":"not-allowed",opacity:anyDispo?1:0.55}}>
              <div style={{display:"flex",alignItems:"center",gap:11,pointerEvents:"none"}}>
                <span style={{fontSize:28}}>{m.e}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:2,flexWrap:"wrap"}}>
                    <span style={{fontWeight:800,fontSize:14,color:C.navy}}>{v.nom}</span>
                    {inCart&&<span style={{background:m.c,color:C.white,borderRadius:20,fontSize:9,padding:"2px 7px",fontWeight:700}}>✓</span>}
                    {allRupture&&<span style={{background:"#FEE2E2",color:C.red,borderRadius:20,fontSize:9,padding:"2px 7px",fontWeight:700}}>Rupture</span>}
                    {!allRupture&&!anyDispo&&<span style={{background:"#FFF7ED",color:C.orange,borderRadius:20,fontSize:9,padding:"2px 7px",fontWeight:700}}>Partiel</span>}
                  </div>
                  <span style={{background:m.l,color:m.c,border:`1px solid ${m.c}`,borderRadius:18,fontSize:10,padding:"2px 7px",fontWeight:600,marginRight:5}}>{v.cat}</span>
                  <span style={{fontSize:10,color:C.gray}}>{v.cycle}</span>
                  {v.cal.length>1&&<span style={{fontSize:10,color:C.gray,marginLeft:5}}>· {v.cal.length} calibres</span>}
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:11,color:fp?m.c:C.gray,fontWeight:fp?700:400}}>{fp?`À partir de ${parseFloat(fp).toFixed(2)} €`:"Voir tarifs"}</div>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{height:20}}/>
      </div>
    </div>
  );
}
