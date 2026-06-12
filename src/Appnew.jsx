import { useState, useRef, useEffect, useCallback } from "react";

const C={navy:"#1B3A6B",red:"#E8401C",orange:"#F5A623",light:"#F4F6FB",white:"#FFF",gray:"#64748B",lgray:"#E2E8F0",green:"#16A34A",text:"#1E293B"};
const BN=({s=22})=><span style={{fontFamily:"Arial Black,Impact,sans-serif",fontWeight:900,fontStyle:"italic",fontSize:s,color:C.red,letterSpacing:1}}>GARRIGUES</span>;
const CAT={"Pomme de terre":{e:"🥔",c:C.orange,l:"#FFF7ED"},"Échalote":{e:"🧅",c:C.red,l:"#FFF0F6"},"Oignon":{e:"🧅",c:C.green,l:"#F0FDF4"},"Ail":{e:"🧄",c:C.navy,l:"#EEF2FF"}};
const getConds=v=>v.conds;
const VS=[{"id": 1, "nom": "Actrice", "cat": "Pomme de terre", "cal": ["35/55"], "conds": ["5 kg", "25 kg"], "cycle": "Mi-tardif", "usage": "Consommation", "res": "Bonne au mildiou", "qual": "Chair ferme, saveur douce"}, {"id": 2, "nom": "Agata", "cat": "Pomme de terre", "cal": ["28/35", "35/45"], "conds": ["25 plants", "60 plants", "100 plants", "1,5 kg", "3 kg", "5 kg", "10 kg", "25 kg"], "cycle": "Précoce", "usage": "Consommation / Primeur", "res": "Sensible au mildiou", "qual": "Chair jaune ferme, excellente saveur"}, {"id": 3, "nom": "Agria", "cat": "Pomme de terre", "cal": ["28/35", "35/55"], "conds": ["60 plants", "100 plants", "1,5 kg", "3 kg", "5 kg", "10 kg", "25 kg"], "cycle": "Mi-tardif", "usage": "Frites / Industrie", "res": "Bonne résistance", "qual": "Chair jaune, excellente pour frites"}, {"id": 4, "nom": "Alouette", "cat": "Pomme de terre", "cal": ["25/35", "35/45", "28/35"], "conds": ["60 plants", "100 plants", "3 kg", "5 kg", "25 kg"], "cycle": "Mi-précoce", "usage": "Consommation", "res": "Résistance moyenne", "qual": "Chair blanche, polyvalente"}, {"id": 5, "nom": "Amandine", "cat": "Pomme de terre", "cal": ["25/32", "32/40"], "conds": ["25 plants", "60 plants", "100 plants", "1,5 kg", "3 kg", "5 kg", "25 kg"], "cycle": "Précoce", "usage": "Consommation / Primeur", "res": "Bonne", "qual": "Chair ferme, saveur fine"}, {"id": 6, "nom": "Anais", "cat": "Pomme de terre", "cal": ["28/35", "40/50"], "conds": ["5 kg", "25 kg"], "cycle": "Mi-précoce", "usage": "Consommation", "res": "Résistance correcte", "qual": "Chair blanche, polyvalente"}, {"id": 7, "nom": "Annabelle", "cat": "Pomme de terre", "cal": ["28/30", "30/40"], "conds": ["3 kg", "5 kg", "25 kg"], "cycle": "Précoce", "usage": "Consommation", "res": "Bonne (nématodes)", "qual": "Chair jaune ferme, goût excellent"}, {"id": 8, "nom": "Bf15", "cat": "Pomme de terre", "cal": ["25/32", "35/40"], "conds": ["3 kg", "5 kg", "25 kg"], "cycle": "Mi-tardif", "usage": "Consommation / Salade", "res": "Bonne", "qual": "Chair ferme jaune, saveur fine"}, {"id": 9, "nom": "Belle de Fontenay", "cat": "Pomme de terre", "cal": ["25/30", "35/40"], "conds": ["25 plants", "60 plants", "100 plants", "1,5 kg", "3 kg", "5 kg", "25 kg"], "cycle": "Précoce", "usage": "Gastronomie", "res": "Sensible au mildiou", "qual": "Chair ferme, goût exceptionnel"}, {"id": 10, "nom": "Bintje", "cat": "Pomme de terre", "cal": ["28/35", "35/45"], "conds": ["25 plants", "60 plants", "100 plants", "1,5 kg", "3 kg", "5 kg", "10 kg", "25 kg"], "cycle": "Mi-tardif", "usage": "Frites / Purée", "res": "Sensible au mildiou", "qual": "Chair jaune, très polyvalente"}, {"id": 11, "nom": "Caesar", "cat": "Pomme de terre", "cal": ["35/45"], "conds": ["25 kg"], "cycle": "Mi-tardif", "usage": "Consommation", "res": "Bonne résistance globale", "qual": "Chair jaune, bonne tenue cuisson"}, {"id": 12, "nom": "Carrera", "cat": "Pomme de terre", "cal": ["45/55"], "conds": ["5 kg", "25 kg"], "cycle": "Tardif", "usage": "Consommation / Industrie", "res": "Très bonne résistance", "qual": "Chair blanche, gros calibre"}, {"id": 13, "nom": "Charlotte", "cat": "Pomme de terre", "cal": ["25/35", "35/45", "25/32"], "conds": ["25 plants", "60 plants", "100 plants", "1,5 kg", "3 kg", "5 kg", "10 kg", "25 kg"], "cycle": "Mi-précoce", "usage": "Consommation / Salade", "res": "Résistance moyenne", "qual": "Chair ferme jaune, saveur douce"}, {"id": 14, "nom": "Cherie", "cat": "Pomme de terre", "cal": ["25/32", "32/40"], "conds": ["25 plants", "60 plants", "100 plants", "1,5 kg", "3 kg", "5 kg", "25 kg"], "cycle": "Précoce", "usage": "Gastronomie", "res": "Bonne", "qual": "Chair rouge rosée, saveur fine"}, {"id": 15, "nom": "Cephora", "cat": "Pomme de terre", "cal": ["28/35", "35/45"], "conds": ["25 kg"], "cycle": "Mi-précoce", "usage": "Consommation", "res": "Bonne", "qual": "Chair jaune, saveur agréable"}, {"id": 16, "nom": "Colomba", "cat": "Pomme de terre", "cal": ["28/35", "35/50"], "conds": ["60 plants", "100 plants", "5 kg", "25 kg"], "cycle": "Mi-précoce", "usage": "Consommation", "res": "Bonne (maladies)", "qual": "Chair blanche, peau lisse"}, {"id": 17, "nom": "Désirée", "cat": "Pomme de terre", "cal": ["28/35", "35/45"], "conds": ["25 plants", "60 plants", "100 plants", "1,5 kg", "3 kg", "5 kg", "10 kg", "25 kg"], "cycle": "Mi-tardif", "usage": "Consommation / Purée", "res": "Bonne (sécheresse)", "qual": "Chair jaune, peau rouge"}, {"id": 18, "nom": "Elodie", "cat": "Pomme de terre", "cal": ["28/35", "35/45"], "conds": ["60 plants", "100 plants", "1,5 kg", "3 kg", "5 kg", "25 kg"], "cycle": "Mi-précoce", "usage": "Consommation", "res": "Bonne", "qual": "Chair jaune ferme"}, {"id": 19, "nom": "Federica", "cat": "Pomme de terre", "cal": ["28/35", "35/55"], "conds": ["60 plants", "100 plants", "5 kg", "25 kg"], "cycle": "Mi-précoce", "usage": "Consommation", "res": "Bonne au mildiou", "qual": "Chair jaune, bonne conservation"}, {"id": 20, "nom": "Institut de Beauvais", "cat": "Pomme de terre", "cal": ["35/60"], "conds": ["5 kg", "25 kg"], "cycle": "Tardif", "usage": "Consommation / Industrie", "res": "Bonne", "qual": "Chair blanche, gros rendement"}, {"id": 21, "nom": "Kennebec", "cat": "Pomme de terre", "cal": ["35/60"], "conds": ["5 kg", "25 kg"], "cycle": "Tardif", "usage": "Frites / Chips", "res": "Bonne résistance globale", "qual": "Chair blanche, idéale transformation"}, {"id": 22, "nom": "Linzer delikatess", "cat": "Pomme de terre", "cal": ["25/32"], "conds": ["25 plants", "60 plants", "100 plants", "1,5 kg", "3 kg", "5 kg", "25 kg"], "cycle": "Précoce", "usage": "Gastronomie / Salade", "res": "Sensible", "qual": "Chair jaune très ferme, saveur exc."}, {"id": 23, "nom": "Marabel", "cat": "Pomme de terre", "cal": ["28/35", "35/45"], "conds": ["60 plants", "100 plants", "3 kg", "5 kg", "25 kg"], "cycle": "Mi-précoce", "usage": "Consommation", "res": "Bonne au mildiou", "qual": "Chair jaune, aspect lisse"}, {"id": 24, "nom": "Monalisa", "cat": "Pomme de terre", "cal": ["28/35", "35/45", "45/50"], "conds": ["25 plants", "60 plants", "100 plants", "1,5 kg", "3 kg", "5 kg", "10 kg", "25 kg"], "cycle": "Mi-tardif", "usage": "Consommation / Frites", "res": "Bonne (sécheresse)", "qual": "Chair jaune ferme, polyvalente"}, {"id": 25, "nom": "Nazca", "cat": "Pomme de terre", "cal": ["35/50"], "conds": ["5 kg", "25 kg"], "cycle": "Mi-tardif", "usage": "Consommation", "res": "Très bonne résistance", "qual": "Chair blanche, bonne tenue"}, {"id": 26, "nom": "Nicola", "cat": "Pomme de terre", "cal": ["28/35", "35/45"], "conds": ["25 plants", "60 plants", "100 plants", "5 kg", "25 kg"], "cycle": "Mi-précoce", "usage": "Consommation / Salade", "res": "Bonne", "qual": "Chair jaune ferme, saveur fine"}, {"id": 27, "nom": "Ratte", "cat": "Pomme de terre", "cal": ["25/32"], "conds": ["25 plants", "60 plants", "100 plants", "3 kg", "5 kg", "25 kg"], "cycle": "Tardif", "usage": "Gastronomie", "res": "Sensible au mildiou", "qual": "Chair ferme, goût de noisette"}, {"id": 28, "nom": "Rosabelle", "cat": "Pomme de terre", "cal": ["25/35", "35/50"], "conds": ["60 plants", "100 plants", "1,5 kg", "3 kg", "5 kg", "10 kg", "25 kg"], "cycle": "Mi-précoce", "usage": "Consommation", "res": "Bonne", "qual": "Chair rosée, aspect original"}, {"id": 29, "nom": "Red Pontiac", "cat": "Pomme de terre", "cal": ["35/60"], "conds": ["25 kg"], "cycle": "Mi-tardif", "usage": "Consommation / Purée", "res": "Bonne", "qual": "Chair blanche, peau rouge"}, {"id": 30, "nom": "Roseval", "cat": "Pomme de terre", "cal": ["25/32", "35/40"], "conds": ["25 plants", "60 plants", "100 plants", "1,5 kg", "3 kg", "5 kg", "25 kg"], "cycle": "Mi-tardif", "usage": "Consommation / Salade", "res": "Résistance moyenne", "qual": "Chair jaune, peau rouge, saveur douce"}, {"id": 31, "nom": "Rudolph", "cat": "Pomme de terre", "cal": ["28/40", "40/50"], "conds": ["5 kg", "25 kg"], "cycle": "Précoce", "usage": "Consommation", "res": "Bonne au mildiou", "qual": "Chair jaune, peau rouge vive"}, {"id": 32, "nom": "Sirtema", "cat": "Pomme de terre", "cal": ["28/40", "40/50", "28/35"], "conds": ["25 plants", "60 plants", "100 plants", "3 kg", "5 kg", "25 kg"], "cycle": "Très précoce", "usage": "Primeur / Consommation", "res": "Sensible au mildiou", "qual": "Chair blanche, très précoce"}, {"id": 33, "nom": "Spunta", "cat": "Pomme de terre", "cal": ["28/35", "35/45"], "conds": ["25 plants", "60 plants", "100 plants", "1,5 kg", "3 kg", "5 kg", "10 kg", "25 kg"], "cycle": "Précoce", "usage": "Consommation", "res": "Résistance correcte", "qual": "Chair jaune, allongée, bonne saveur"}, {"id": 34, "nom": "Steemsters", "cat": "Pomme de terre", "cal": ["28/40", "40/50"], "conds": ["3 kg", "5 kg", "25 kg"], "cycle": "Tardif", "usage": "Consommation / Industrie", "res": "Très bonne résistance", "qual": "Chair blanche, gros rendement"}, {"id": 35, "nom": "Vitelotte", "cat": "Pomme de terre", "cal": ["25/32"], "conds": ["25 plants", "60 plants", "100 plants", "1,5 kg", "3 kg", "25 kg"], "cycle": "Tardif", "usage": "Gastronomie", "res": "Robuste", "qual": "Chair violette, saveur de châtaigne"}, {"id": 36, "nom": "Mikor", "cat": "Échalote", "cal": ["15-35"], "conds": ["250 g", "500 g", "20 kg"], "cycle": "Mi-précoce", "usage": "Consommation / Cuisine", "res": "Bonne au mildiou", "qual": "Saveur prononcée, peau cuivrée"}, {"id": 37, "nom": "Jermor", "cat": "Échalote", "cal": ["15-35"], "conds": ["250 g", "500 g", "20 kg"], "cycle": "Mi-tardif", "usage": "Consommation / Cuisine", "res": "Bonne résistance", "qual": "Saveur douce, longue conservation"}, {"id": 38, "nom": "Longor", "cat": "Échalote", "cal": ["15-35"], "conds": ["250 g", "500 g", "20 kg", "20 kg bio"], "cycle": "Mi-tardif", "usage": "Bio / Gastronomie", "res": "Adaptée bio", "qual": "Saveur fine, forme allongée"}, {"id": 39, "nom": "Flavor", "cat": "Ail", "cal": ["45-55"], "conds": ["250 g", "500 g", "20 kg"], "cycle": "Mi-tardif", "usage": "Consommation / Gastronomie", "res": "Bonne résistance", "qual": "Ail rose, arôme subtil"}, {"id": 40, "nom": "Cledor", "cat": "Ail", "cal": ["45-55"], "conds": ["250 g", "500 g", "20 kg"], "cycle": "Tardif", "usage": "Consommation / Cuisine", "res": "Bonne (maladies)", "qual": "Ail blanc, saveur intense"}, {"id": 41, "nom": "Stuttgarter", "cat": "Oignon", "cal": ["14-21"], "conds": ["250 g", "500 g", "25 kg"], "cycle": "Tardif", "usage": "Consommation / Conservation", "res": "Très bonne conservation", "qual": "Saveur douce, peau dorée"}, {"id": 42, "nom": "Sturon", "cat": "Oignon", "cal": ["14-21", "22-26", "10-21"], "conds": ["250 g", "500 g", "25 kg", "25 kg bio"], "cycle": "Mi-tardif", "usage": "Consommation / Conservation", "res": "Bonne résistance", "qual": "Forme ronde, saveur douce"}, {"id": 43, "nom": "Paille des vertus", "cat": "Oignon", "cal": ["14-21"], "conds": ["250 g", "500 g", "25 kg"], "cycle": "Tardif", "usage": "Consommation", "res": "Bonne résistance", "qual": "Saveur forte, tradition française"}, {"id": 44, "nom": "Snowball", "cat": "Oignon", "cal": ["14-21"], "conds": ["250 g", "500 g", "25 kg"], "cycle": "Mi-précoce", "usage": "Consommation / Cuisine", "res": "Correcte", "qual": "Oignon blanc, doux et croquant", "emoji": "🧅⚪"}, {"id": 45, "nom": "Red Karmen", "cat": "Oignon", "cal": ["14-21"], "conds": ["250 g", "500 g", "25 kg"], "cycle": "Mi-tardif", "usage": "Consommation / Salade", "res": "Bonne", "qual": "Oignon rouge, saveur douce et sucrée", "emoji": "🧅🔴"}, {"id": 46, "nom": "Red Baron", "cat": "Oignon", "cal": ["22-26", "10-21"], "conds": ["25 kg bio"], "cycle": "Mi-tardif", "usage": "Bio / Salade", "res": "Adaptée bio", "qual": "Oignon rouge bio, saveur fine", "emoji": "🧅🔴"}];
const CELL={"1__35/55__1": {"s": "SAC", "r": "C11"}, "1__35/55__0": {"s": "SAC", "r": "M11"}, "2__28/35__7": {"s": "SAC", "r": "C12"}, "2__28/35__6": {"s": "SAC", "r": "H12"}, "2__28/35__5": {"s": "SAC", "r": "M12"}, "2__28/35__4": {"s": "SAC", "r": "R12"}, "2__28/35__3": {"s": "SAC", "r": "W12"}, "2__35/45__7": {"s": "SAC", "r": "C13"}, "2__35/45__6": {"s": "SAC", "r": "H13"}, "2__35/45__5": {"s": "SAC", "r": "M13"}, "2__35/45__4": {"s": "SAC", "r": "R13"}, "2__28/35__2": {"s": "CLAYETTE", "r": "C12"}, "2__28/35__1": {"s": "CLAYETTE", "r": "H12"}, "2__28/35__0": {"s": "CLAYETTE", "r": "M12"}, "3__28/35__6": {"s": "SAC", "r": "C14"}, "3__28/35__5": {"s": "SAC", "r": "H14"}, "3__28/35__4": {"s": "SAC", "r": "M14"}, "3__28/35__3": {"s": "SAC", "r": "R14"}, "3__28/35__2": {"s": "SAC", "r": "W14"}, "3__35/55__6": {"s": "SAC", "r": "C15"}, "3__35/55__5": {"s": "SAC", "r": "H15"}, "3__35/55__4": {"s": "SAC", "r": "M15"}, "3__35/55__3": {"s": "SAC", "r": "R15"}, "3__28/35__1": {"s": "CLAYETTE", "r": "C15"}, "3__28/35__0": {"s": "CLAYETTE", "r": "H15"}, "4__25/35__4": {"s": "SAC", "r": "C20"}, "4__25/35__3": {"s": "SAC", "r": "M20"}, "4__25/35__2": {"s": "SAC", "r": "R20"}, "4__35/45__4": {"s": "SAC", "r": "C21"}, "4__35/45__3": {"s": "SAC", "r": "M21"}, "4__35/45__2": {"s": "SAC", "r": "R21"}, "4__28/35__1": {"s": "CLAYETTE", "r": "C16"}, "4__28/35__0": {"s": "CLAYETTE", "r": "H16"}, "5__25/32__6": {"s": "SAC", "r": "C22"}, "5__25/32__5": {"s": "SAC", "r": "M22"}, "5__25/32__4": {"s": "SAC", "r": "R22"}, "5__25/32__3": {"s": "SAC", "r": "W22"}, "5__32/40__6": {"s": "SAC", "r": "C23"}, "5__32/40__5": {"s": "SAC", "r": "M23"}, "5__32/40__4": {"s": "SAC", "r": "R23"}, "5__25/32__2": {"s": "CLAYETTE", "r": "C13"}, "5__25/32__1": {"s": "CLAYETTE", "r": "H13"}, "5__25/32__0": {"s": "CLAYETTE", "r": "M13"}, "6__28/35__1": {"s": "SAC", "r": "C24"}, "6__28/35__0": {"s": "SAC", "r": "M24"}, "6__40/50__1": {"s": "SAC", "r": "C25"}, "6__40/50__0": {"s": "SAC", "r": "M25"}, "7__28/30__2": {"s": "SAC", "r": "C26"}, "7__28/30__1": {"s": "SAC", "r": "M26"}, "7__28/30__0": {"s": "SAC", "r": "R26"}, "7__30/40__2": {"s": "SAC", "r": "C27"}, "7__30/40__1": {"s": "SAC", "r": "M27"}, "7__30/40__0": {"s": "SAC", "r": "R27"}, "8__25/32__2": {"s": "SAC", "r": "C30"}, "8__25/32__1": {"s": "SAC", "r": "M30"}, "8__25/32__0": {"s": "SAC", "r": "R30"}, "8__35/40__2": {"s": "SAC", "r": "C31"}, "8__35/40__1": {"s": "SAC", "r": "M31"}, "8__35/40__0": {"s": "SAC", "r": "R31"}, "9__25/30__6": {"s": "SAC", "r": "C32"}, "9__25/30__5": {"s": "SAC", "r": "M32"}, "9__25/30__4": {"s": "SAC", "r": "R32"}, "9__25/30__3": {"s": "SAC", "r": "W32"}, "9__35/40__6": {"s": "SAC", "r": "C33"}, "9__35/40__5": {"s": "SAC", "r": "M33"}, "9__35/40__4": {"s": "SAC", "r": "R33"}, "9__25/30__2": {"s": "CLAYETTE", "r": "C17"}, "9__25/30__1": {"s": "CLAYETTE", "r": "H17"}, "9__25/30__0": {"s": "CLAYETTE", "r": "M17"}, "10__28/35__7": {"s": "SAC", "r": "C36"}, "10__28/35__6": {"s": "SAC", "r": "H36"}, "10__28/35__5": {"s": "SAC", "r": "M36"}, "10__28/35__4": {"s": "SAC", "r": "R36"}, "10__28/35__3": {"s": "SAC", "r": "W36"}, "10__35/45__7": {"s": "SAC", "r": "C37"}, "10__35/45__6": {"s": "SAC", "r": "H37"}, "10__35/45__5": {"s": "SAC", "r": "M37"}, "10__35/45__4": {"s": "SAC", "r": "R37"}, "10__28/35__2": {"s": "CLAYETTE", "r": "C18"}, "10__28/35__1": {"s": "CLAYETTE", "r": "H18"}, "10__28/35__0": {"s": "CLAYETTE", "r": "M18"}, "11__35/45__0": {"s": "SAC", "r": "C38"}, "12__45/55__1": {"s": "SAC", "r": "C39"}, "12__45/55__0": {"s": "SAC", "r": "M39"}, "13__25/35__7": {"s": "SAC", "r": "C40"}, "13__25/35__6": {"s": "SAC", "r": "H40"}, "13__25/35__5": {"s": "SAC", "r": "M40"}, "13__25/35__4": {"s": "SAC", "r": "R40"}, "13__25/35__3": {"s": "SAC", "r": "W40"}, "13__35/45__7": {"s": "SAC", "r": "C41"}, "13__35/45__6": {"s": "SAC", "r": "H41"}, "13__35/45__5": {"s": "SAC", "r": "M41"}, "13__35/45__4": {"s": "SAC", "r": "R41"}, "13__25/32__2": {"s": "CLAYETTE", "r": "C19"}, "13__25/32__1": {"s": "CLAYETTE", "r": "H19"}, "13__25/32__0": {"s": "CLAYETTE", "r": "M19"}, "14__25/32__6": {"s": "SAC", "r": "C42"}, "14__25/32__5": {"s": "SAC", "r": "M42"}, "14__25/32__4": {"s": "SAC", "r": "R42"}, "14__25/32__3": {"s": "SAC", "r": "W42"}, "14__32/40__6": {"s": "SAC", "r": "C43"}, "14__32/40__5": {"s": "SAC", "r": "M43"}, "14__25/32__2": {"s": "CLAYETTE", "r": "C20"}, "14__25/32__1": {"s": "CLAYETTE", "r": "H20"}, "14__25/32__0": {"s": "CLAYETTE", "r": "M20"}, "15__28/35__0": {"s": "SAC", "r": "C44"}, "15__35/45__0": {"s": "SAC", "r": "C45"}, "16__28/35__3": {"s": "SAC", "r": "C46"}, "16__35/50__3": {"s": "SAC", "r": "C47"}, "16__35/50__2": {"s": "SAC", "r": "M47"}, "16__28/35__1": {"s": "CLAYETTE", "r": "C21"}, "16__28/35__0": {"s": "CLAYETTE", "r": "H21"}, "17__28/35__7": {"s": "SAC", "r": "C48"}, "17__28/35__6": {"s": "SAC", "r": "H48"}, "17__28/35__5": {"s": "SAC", "r": "M48"}, "17__28/35__4": {"s": "SAC", "r": "R48"}, "17__28/35__3": {"s": "SAC", "r": "W48"}, "17__35/45__7": {"s": "SAC", "r": "C49"}, "17__35/45__6": {"s": "SAC", "r": "H49"}, "17__35/45__5": {"s": "SAC", "r": "M49"}, "17__35/45__4": {"s": "SAC", "r": "R49"}, "17__28/35__2": {"s": "CLAYETTE", "r": "C22"}, "17__28/35__1": {"s": "CLAYETTE", "r": "H22"}, "17__28/35__0": {"s": "CLAYETTE", "r": "M22"}, "18__28/35__5": {"s": "SAC", "r": "C53"}, "18__28/35__4": {"s": "SAC", "r": "M53"}, "18__28/35__3": {"s": "SAC", "r": "R53"}, "18__28/35__2": {"s": "SAC", "r": "W53"}, "18__35/45__5": {"s": "SAC", "r": "C54"}, "18__35/45__4": {"s": "SAC", "r": "M54"}, "18__35/45__3": {"s": "SAC", "r": "R54"}, "18__28/35__1": {"s": "CLAYETTE", "r": "C23"}, "18__28/35__0": {"s": "CLAYETTE", "r": "H23"}, "19__28/35__3": {"s": "SAC", "r": "C55"}, "19__35/55__3": {"s": "SAC", "r": "C56"}, "19__35/55__2": {"s": "SAC", "r": "M56"}, "19__28/35__1": {"s": "CLAYETTE", "r": "C24"}, "19__28/35__0": {"s": "CLAYETTE", "r": "H24"}, "20__35/60__1": {"s": "SAC", "r": "C57"}, "20__35/60__0": {"s": "SAC", "r": "M57"}, "21__35/60__1": {"s": "SAC", "r": "C60"}, "21__35/60__0": {"s": "SAC", "r": "M60"}, "22__25/32__6": {"s": "SAC", "r": "C63"}, "22__25/32__5": {"s": "SAC", "r": "M63"}, "22__25/32__4": {"s": "SAC", "r": "R63"}, "22__25/32__3": {"s": "SAC", "r": "W63"}, "22__25/32__2": {"s": "CLAYETTE", "r": "C31"}, "22__25/32__1": {"s": "CLAYETTE", "r": "H31"}, "22__25/32__0": {"s": "CLAYETTE", "r": "M31"}, "23__28/35__4": {"s": "SAC", "r": "C65"}, "23__28/35__3": {"s": "SAC", "r": "M65"}, "23__28/35__2": {"s": "SAC", "r": "R65"}, "23__35/45__4": {"s": "SAC", "r": "C66"}, "23__35/45__3": {"s": "SAC", "r": "M66"}, "23__35/45__2": {"s": "SAC", "r": "R66"}, "23__28/35__1": {"s": "CLAYETTE", "r": "C25"}, "23__28/35__0": {"s": "CLAYETTE", "r": "H25"}, "24__28/35__7": {"s": "SAC", "r": "C67"}, "24__28/35__6": {"s": "SAC", "r": "H67"}, "24__28/35__5": {"s": "SAC", "r": "M67"}, "24__28/35__4": {"s": "SAC", "r": "R67"}, "24__28/35__3": {"s": "SAC", "r": "W67"}, "24__35/45__7": {"s": "SAC", "r": "C68"}, "24__35/45__6": {"s": "SAC", "r": "H68"}, "24__35/45__5": {"s": "SAC", "r": "M68"}, "24__35/45__4": {"s": "SAC", "r": "R68"}, "24__45/50__7": {"s": "SAC", "r": "C69"}, "24__28/35__2": {"s": "CLAYETTE", "r": "C26"}, "24__28/35__1": {"s": "CLAYETTE", "r": "H26"}, "24__28/35__0": {"s": "CLAYETTE", "r": "M26"}, "25__35/50__1": {"s": "SAC", "r": "C71"}, "25__35/50__0": {"s": "SAC", "r": "M71"}, "26__28/35__4": {"s": "SAC", "r": "C72"}, "26__28/35__3": {"s": "SAC", "r": "M72"}, "26__35/45__4": {"s": "SAC", "r": "C73"}, "26__35/45__3": {"s": "SAC", "r": "M73"}, "26__28/35__2": {"s": "CLAYETTE", "r": "C27"}, "26__28/35__1": {"s": "CLAYETTE", "r": "H27"}, "26__28/35__0": {"s": "CLAYETTE", "r": "M27"}, "27__25/32__5": {"s": "SAC", "r": "C75"}, "27__25/32__4": {"s": "SAC", "r": "M75"}, "27__25/32__3": {"s": "SAC", "r": "R75"}, "27__25/32__2": {"s": "CLAYETTE", "r": "C28"}, "27__25/32__1": {"s": "CLAYETTE", "r": "H28"}, "27__25/32__0": {"s": "CLAYETTE", "r": "M28"}, "28__25/35__6": {"s": "SAC", "r": "C76"}, "28__25/35__5": {"s": "SAC", "r": "H76"}, "28__25/35__4": {"s": "SAC", "r": "M76"}, "28__25/35__3": {"s": "SAC", "r": "R76"}, "28__25/35__2": {"s": "SAC", "r": "W76"}, "28__35/50__6": {"s": "SAC", "r": "C77"}, "28__35/50__5": {"s": "SAC", "r": "H77"}, "28__35/50__4": {"s": "SAC", "r": "M77"}, "28__35/50__3": {"s": "SAC", "r": "R77"}, "28__25/35__1": {"s": "CLAYETTE", "r": "C29"}, "28__25/35__0": {"s": "CLAYETTE", "r": "H29"}, "29__35/60__0": {"s": "SAC", "r": "C80"}, "30__25/32__6": {"s": "SAC", "r": "C81"}, "30__25/32__5": {"s": "SAC", "r": "M81"}, "30__25/32__4": {"s": "SAC", "r": "R81"}, "30__25/32__3": {"s": "SAC", "r": "W81"}, "30__35/40__6": {"s": "SAC", "r": "C82"}, "30__35/40__5": {"s": "SAC", "r": "M82"}, "30__35/40__4": {"s": "SAC", "r": "R82"}, "30__25/32__2": {"s": "CLAYETTE", "r": "C30"}, "30__25/32__1": {"s": "CLAYETTE", "r": "H30"}, "30__25/32__0": {"s": "CLAYETTE", "r": "M30"}, "31__28/40__1": {"s": "SAC", "r": "C83"}, "31__40/50__1": {"s": "SAC", "r": "C84"}, "31__40/50__0": {"s": "SAC", "r": "M84"}, "32__28/40__5": {"s": "SAC", "r": "C85"}, "32__28/40__4": {"s": "SAC", "r": "M85"}, "32__28/40__3": {"s": "SAC", "r": "R85"}, "32__40/50__5": {"s": "SAC", "r": "C87"}, "32__40/50__4": {"s": "SAC", "r": "M87"}, "32__40/50__3": {"s": "SAC", "r": "R87"}, "32__28/35__2": {"s": "CLAYETTE", "r": "C32"}, "32__28/35__1": {"s": "CLAYETTE", "r": "H32"}, "32__28/35__0": {"s": "CLAYETTE", "r": "M32"}, "33__28/35__7": {"s": "SAC", "r": "C88"}, "33__28/35__6": {"s": "SAC", "r": "H88"}, "33__28/35__5": {"s": "SAC", "r": "M88"}, "33__28/35__4": {"s": "SAC", "r": "R88"}, "33__28/35__3": {"s": "SAC", "r": "W88"}, "33__35/45__7": {"s": "SAC", "r": "C90"}, "33__35/45__6": {"s": "SAC", "r": "H90"}, "33__35/45__5": {"s": "SAC", "r": "M90"}, "33__35/45__4": {"s": "SAC", "r": "R90"}, "33__28/35__2": {"s": "CLAYETTE", "r": "C33"}, "33__28/35__1": {"s": "CLAYETTE", "r": "H33"}, "33__28/35__0": {"s": "CLAYETTE", "r": "M33"}, "34__28/40__2": {"s": "SAC", "r": "C92"}, "34__28/40__1": {"s": "SAC", "r": "M92"}, "34__28/40__0": {"s": "SAC", "r": "R92"}, "34__40/50__2": {"s": "SAC", "r": "C93"}, "34__40/50__1": {"s": "SAC", "r": "M93"}, "35__25/32__5": {"s": "SAC", "r": "C94"}, "35__25/32__4": {"s": "SAC", "r": "R94"}, "35__25/32__3": {"s": "SAC", "r": "W94"}, "35__25/32__2": {"s": "CLAYETTE", "r": "C34"}, "35__25/32__1": {"s": "CLAYETTE", "r": "H34"}, "35__25/32__0": {"s": "CLAYETTE", "r": "M34"}, "36__15-35__2": {"s": "BULBE", "r": "J12"}, "36__15-35__1": {"s": "BULBE", "r": "O12"}, "36__15-35__0": {"s": "BULBE", "r": "T12"}, "37__15-35__2": {"s": "BULBE", "r": "J13"}, "37__15-35__1": {"s": "BULBE", "r": "O13"}, "37__15-35__0": {"s": "BULBE", "r": "T13"}, "38__15-35__2": {"s": "BULBE", "r": "J14"}, "38__15-35__1": {"s": "BULBE", "r": "O14"}, "38__15-35__0": {"s": "BULBE", "r": "T14"}, "38__15-35__3": {"s": "BULBE", "r": "AE14"}, "39__45-55__2": {"s": "BULBE", "r": "J15"}, "39__45-55__1": {"s": "BULBE", "r": "O15"}, "39__45-55__0": {"s": "BULBE", "r": "T15"}, "40__45-55__2": {"s": "BULBE", "r": "J16"}, "40__45-55__1": {"s": "BULBE", "r": "O16"}, "40__45-55__0": {"s": "BULBE", "r": "T16"}, "41__14-21__2": {"s": "BULBE", "r": "E17"}, "41__14-21__1": {"s": "BULBE", "r": "O17"}, "41__14-21__0": {"s": "BULBE", "r": "T17"}, "42__14-21__2": {"s": "BULBE", "r": "E18"}, "42__14-21__1": {"s": "BULBE", "r": "O18"}, "42__14-21__0": {"s": "BULBE", "r": "T18"}, "42__22-26__3": {"s": "BULBE", "r": "Z22"}, "42__10-21__3": {"s": "BULBE", "r": "Z23"}, "43__14-21__2": {"s": "BULBE", "r": "E19"}, "43__14-21__1": {"s": "BULBE", "r": "O19"}, "43__14-21__0": {"s": "BULBE", "r": "T19"}, "44__14-21__2": {"s": "BULBE", "r": "E20"}, "44__14-21__1": {"s": "BULBE", "r": "O20"}, "44__14-21__0": {"s": "BULBE", "r": "T20"}, "45__14-21__2": {"s": "BULBE", "r": "E21"}, "45__14-21__1": {"s": "BULBE", "r": "O21"}, "45__14-21__0": {"s": "BULBE", "r": "T21"}, "46__22-26__0": {"s": "BULBE", "r": "Z24"}, "46__10-21__0": {"s": "BULBE", "r": "Z25"}};
const PRICE0={"1__35/55__1": 30.65, "1__35/55__0": 7.95, "2__28/35__7": 33.82, "2__28/35__6": 14.75, "2__28/35__5": 7.98, "2__28/35__4": 4.98, "2__28/35__3": 3.4, "2__35/45__7": 27.82, "2__35/45__6": 12.35, "2__35/45__5": 6.78, "2__35/45__4": 4.26, "2__28/35__2": 5.74, "2__28/35__1": 4.57, "2__28/35__0": 2.56, "3__28/35__6": 29.71, "3__28/35__5": 13.1, "3__28/35__4": 7.16, "3__28/35__3": 4.49, "3__28/35__2": 5.6, "3__35/55__6": 21.21, "3__35/55__5": 11.3, "3__35/55__4": 5.46, "3__35/55__3": 3.47, "3__28/35__1": 5.6, "3__28/35__0": 4.48, "4__25/35__4": 40.0, "4__25/35__3": 9.22, "4__25/35__2": 5.72, "4__35/45__4": 31.25, "4__35/45__3": 7.47, "4__35/45__2": 4.67, "4__28/35__1": 6.86, "4__28/35__0": 5.29, "5__25/32__6": 51.48, "5__25/32__5": 15.58, "5__25/32__4": 9.61, "5__25/32__3": 5.44, "5__32/40__6": 45.85, "5__32/40__5": 12.81, "5__32/40__4": 8.2, "5__25/32__2": 10.81, "5__25/32__1": 8.7, "5__25/32__0": 3.05, "6__28/35__1": 42.2, "6__28/35__0": 9.66, "6__40/50__1": 30.7, "6__40/50__0": 7.36, "7__28/30__2": 42.53, "7__28/30__1": 9.73, "7__28/30__0": 6.42, "7__30/40__2": 35.78, "7__30/40__1": 8.38, "7__30/40__0": 6.02, "8__25/32__2": 37.07, "8__25/32__1": 8.63, "8__25/32__0": 4.6, "8__35/40__2": 27.57, "8__35/40__1": 6.73, "8__35/40__0": 5.37, "9__25/30__6": 36.32, "9__25/30__5": 8.48, "9__25/30__4": 5.28, "9__25/30__3": 3.55, "9__35/40__6": 27.57, "9__35/40__5": 6.73, "9__35/40__4": 4.23, "9__25/30__2": 6.8, "9__25/30__1": 4.76, "9__25/30__0": 2.63, "10__28/35__7": 27.57, "10__28/35__6": 12.1, "10__28/35__5": 6.58, "10__28/35__4": 4.23, "10__28/35__3": 3.02, "10__35/45__7": 20.7, "10__35/45__6": 11.1, "10__35/45__5": 5.21, "10__35/45__4": 3.4, "10__28/35__2": 5.81, "10__28/35__1": 4.2, "10__28/35__0": 2.28, "11__35/45__0": 37.78, "12__45/55__1": 28.35, "12__45/55__0": 5.9, "13__25/35__7": 32.57, "13__25/35__6": 14.1, "13__25/35__5": 7.58, "13__25/35__4": 4.83, "13__25/35__3": 3.22, "13__35/45__7": 21.57, "13__35/45__6": 10.45, "13__35/45__5": 5.38, "13__35/45__4": 3.51, "13__25/32__2": 5.94, "13__25/32__1": 4.74, "13__25/32__0": 2.37, "14__25/32__6": 51.1, "14__25/32__5": 11.44, "14__25/32__4": 7.05, "14__25/32__3": 4.44, "14__32/40__6": 44.85, "14__32/40__5": 10.19, "14__25/32__2": 8.05, "14__25/32__1": 6.06, "14__25/32__0": 3.04, "15__28/35__0": 44.45, "15__35/45__0": 37.45, "16__28/35__3": 42.1, "16__35/50__3": 36.1, "16__35/50__2": 8.44, "16__28/35__1": 7.0, "16__28/35__0": 4.92, "17__28/35__7": 29.09, "17__28/35__6": 12.85, "17__28/35__5": 7.04, "17__28/35__4": 4.41, "17__28/35__3": 3.12, "17__35/45__7": 23.59, "17__35/45__6": 10.65, "17__35/45__5": 5.94, "17__35/45__4": 3.75, "17__28/35__2": 5.51, "17__28/35__1": 4.29, "17__28/35__0": 2.42, "18__28/35__5": 34.57, "18__28/35__4": 8.13, "18__28/35__3": 5.07, "18__28/35__2": 3.44, "18__35/45__5": 31.32, "18__35/45__4": 7.48, "18__35/45__3": 4.68, "18__28/35__1": 6.62, "18__28/35__0": 4.64, "19__28/35__3": 37.7, "19__35/55__3": 28.7, "19__35/55__2": 6.96, "19__28/35__1": 6.9, "19__28/35__0": 5.9, "20__35/60__1": 28.6, "20__35/60__0": 6.94, "21__35/60__1": 23.82, "21__35/60__0": 5.98, "22__25/32__6": 35.96, "22__25/32__5": 8.41, "22__25/32__4": 5.24, "22__25/32__3": 3.53, "22__25/32__2": 6.63, "22__25/32__1": 4.73, "22__25/32__0": 2.62, "23__28/35__4": 38.85, "23__28/35__3": 8.99, "23__28/35__2": 5.58, "23__35/45__4": 33.85, "23__35/45__3": 7.99, "23__35/45__2": 4.98, "23__28/35__1": 6.84, "23__28/35__0": 4.92, "24__28/35__7": 33.82, "24__28/35__6": 14.6, "24__28/35__5": 7.83, "24__28/35__4": 4.98, "24__28/35__3": 3.4, "24__35/45__7": 23.32, "24__35/45__6": 11.65, "24__35/45__5": 5.78, "24__35/45__4": 3.72, "24__45/50__7": 19.57, "24__28/35__2": 5.8, "24__28/35__1": 4.69, "24__28/35__0": 2.46, "25__35/50__1": 34.7, "25__35/50__0": 6.3, "26__28/35__4": 34.57, "26__28/35__3": 8.13, "26__35/45__4": 27.52, "26__35/45__3": 6.73, "26__28/35__2": 6.1, "26__28/35__1": 5.17, "26__28/35__0": 2.35, "27__25/32__5": 50.82, "27__25/32__4": 11.38, "27__25/32__3": 7.02, "27__25/32__2": 8.67, "27__25/32__1": 6.46, "27__25/32__0": 3.03, "28__25/35__6": 32.57, "28__25/35__5": 14.25, "28__25/35__4": 7.73, "28__25/35__3": 4.83, "28__25/35__2": 3.32, "28__35/50__6": 20.57, "28__35/50__5": 13.55, "28__35/50__4": 5.33, "28__35/50__3": 3.39, "28__25/35__1": 6.24, "28__25/35__0": 4.49, "29__35/60__0": 28.9, "30__25/32__6": 38.07, "30__25/32__5": 8.83, "30__25/32__4": 5.49, "30__25/32__3": 3.35, "30__35/40__6": 28.57, "30__35/40__5": 6.93, "30__35/40__4": 4.35, "30__25/32__2": 6.55, "30__25/32__1": 5.11, "30__25/32__0": 2.6, "31__28/40__1": 43.75, "31__40/50__1": 33.75, "31__40/50__0": 9.97, "32__28/40__5": 31.32, "32__28/40__4": 7.48, "32__28/40__3": 4.68, "32__40/50__5": 23.82, "32__40/50__4": 5.98, "32__40/50__3": 3.78, "32__28/35__2": 5.71, "32__28/35__1": 4.72, "32__28/35__0": 2.49, "33__28/35__7": 23.13, "33__28/35__6": 13.57, "33__28/35__5": 5.6, "33__28/35__4": 3.7, "33__28/35__3": 2.25, "33__35/45__7": 19.95, "33__35/45__6": 12.3, "33__35/45__5": 4.96, "33__35/45__4": 3.31, "33__28/35__2": 5.11, "33__28/35__1": 4.88, "33__28/35__0": 2.26, "34__28/40__2": 31.32, "34__28/40__1": 7.48, "34__28/40__0": 4.68, "34__40/50__2": 25.07, "34__40/50__1": 6.23, "35__25/32__5": 72.82, "35__25/32__4": 9.81, "35__25/32__3": 5.74, "35__25/32__2": 10.55, "35__25/32__1": 6.88, "35__25/32__0": 3.65, "36__15-35__2": 80.0, "36__15-35__1": 2.65, "36__15-35__0": 1.6, "37__15-35__2": 80.0, "37__15-35__1": 2.65, "37__15-35__0": 1.6, "38__15-35__2": 80.0, "38__15-35__1": 2.65, "38__15-35__0": 1.6, "38__15-35__3": 110.0, "39__45-55__2": 105.0, "39__45-55__1": 3.5, "39__45-55__0": 1.95, "40__45-55__2": 105.0, "40__45-55__1": 3.5, "40__45-55__0": 1.95, "41__14-21__2": 65.0, "41__14-21__1": 1.55, "41__14-21__0": 0.95, "42__14-21__2": 70.0, "42__14-21__1": 1.85, "42__14-21__0": 1.07, "42__22-26__3": 72.5, "42__10-21__3": 95.0, "43__14-21__2": 70.0, "43__14-21__1": 1.85, "43__14-21__0": 1.07, "44__14-21__2": 72.5, "44__14-21__1": 2.05, "44__14-21__0": 1.2, "45__14-21__2": 72.5, "45__14-21__1": 2.05, "45__14-21__0": 1.2, "46__22-26__0": 96.0, "46__10-21__0": 125.0};
const cellFor=(id,cal,idx)=>CELL[`${id}__${cal}__${idx}`];

const mkT=()=>{const t={};VS.forEach(v=>{v.cal.forEach(c=>getConds(v).forEach((_,i)=>{const k=`${v.id}__${c}__${i}`;t[k]=PRICE0[k]!=null?String(PRICE0[k]):"";}));});return t;};
const mkS=()=>{const s={};VS.forEach(v=>{v.cal.forEach(c=>getConds(v).forEach((_,i)=>{s[`${v.id}__${c}__${i}`]="dispo";}));});return s;};
const fmtW=w=>{if(!w)return"—";const[y,wk]=w.split("-W");return`Sem. ${wk} — ${y}`;};
const ADMIN="Garrigues2040!";
const CATS=["Tous","Pomme de terre","Échalote","Oignon","Ail"];
const SUBCOLS=["#E8401C","#1B3A6B","#16A34A","#F5A623","#8B5CF6"];
const SUBLBL=["A","B","C","D","E"];

// emoji propre à une variété (sinon emoji de catégorie)
const vemoji=v=>(v&&v.emoji)?v.emoji:(v?CAT[v.cat].e:"");

// ── stock tri-état : dispo / demande (sur demande) / rupture ──
// Rétro-compat : ancien booléen true→dispo, false→rupture.
const stStatus=val=>(val===false||val==="rupture")?"rupture":(val==="demande"?"demande":"dispo");
const STOCK_STATES={
  dispo:{lbl:"Disponible",col:C.green,bg:"#DCFCE7"},
  demande:{lbl:"Sur demande",col:C.orange,bg:"#FFF7ED"},
  rupture:{lbl:"Rupture de stock",col:C.red,bg:"#FEE2E2"},
};

// ── statuts de commande ──────────────────────────────
const ORDER_STATES={
  "en attente":{lbl:"En attente",emo:"⏳",col:C.orange,bg:"#FFF7ED"},
  "validée":{lbl:"Validée",emo:"✅",col:C.green,bg:"#F0FDF4"},
  "partiellement validée":{lbl:"Partiellement validée",emo:"🟡",col:"#CA8A04",bg:"#FEF9C3"},
  "expédié":{lbl:"Expédié",emo:"📦",col:C.navy,bg:"#EEF2FF"},
};
const ORDER_KEYS=["en attente","validée","partiellement validée","expédié"];
const oState=s=>ORDER_STATES[s]||ORDER_STATES["en attente"];

// ── Téléchargement de commande : Excel (.xlsx) & PDF ──
// Bibliothèques chargées à la volée depuis un CDN (fonctionne une fois
// l'app déployée ; bloqué dans l'aperçu Claude par la CSP, comme JSONBin).
const CDN={
  jspdf:"https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
  autotable:"https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js",
};
const loadScript=src=>new Promise((res,rej)=>{
  if(document.querySelector(`script[src="${src}"]`)){res();return;}
  const s=document.createElement("script");s.src=src;s.onload=()=>res();s.onerror=()=>rej(new Error("load "+src));
  document.head.appendChild(s);
});
const orderLines=(o,tarifs)=>(o.items||[]).map(it=>{
  const v=VS.find(x=>x.id===it.varId);const cond=v?getConds(v)[it.condIdx]:null;
  const pu=parseFloat(tarifs[`${it.varId}__${it.cal}__${it.condIdx}`]);const has=!isNaN(pu);
  return{nom:v?v.nom:"?",cat:v?v.cat:"",cal:it.cal,cond:cond||"",qty:it.qty,pu:has?pu:null,total:has?pu*it.qty:null};
});
const orderTotal=l=>l.reduce((s,x)=>s+(x.total||0),0);
const orderMeta=o=>([
  ["Commande",o.id],["Date",o.date],["Livraison",fmtW(o.semaine)],
  ["Entreprise",o.client?.entreprise||""],["Contact",o.client?.prenom||""],
  ["Adresse",`${o.client?.adresse||""} ${o.client?.codePostal||""}`.trim()],
  ["Email",o.client?.email||""],["Téléphone",o.client?.tel||""],
]);
async function downloadOrderXLSX(o){
  // Construit la liste des cellules à remplir à partir de la table de correspondance,
  // puis appelle la fonction serverless qui remplit le vrai modèle BDC.
  const cells=[];
  (o.items||[]).forEach(it=>{const c=cellFor(it.varId,it.cal,it.condIdx);if(c)cells.push({sheet:c.s,ref:c.r,value:it.qty});});
  const presentation={
    client:o.client?.entreprise||"",
    date:fmtW(o.semaine),
    adresse:`${o.client?.adresse||""}${o.client?.codePostal?(" "+o.client.codePostal):""}`.trim(),
  };
  const res=await fetch("/api/bdc",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({presentation,cells,filename:`Commande_${o.id}.xlsx`})});
  if(!res.ok)throw new Error("HTTP "+res.status);
  const blob=await res.blob();const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download=`Commande_${o.id}.xlsx`;
  document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
}
async function downloadOrderPDF(o,tarifs){
  await loadScript(CDN.jspdf);await loadScript(CDN.autotable);
  const {jsPDF}=window.jspdf;const doc=new jsPDF();const lines=orderLines(o,tarifs);
  doc.setFontSize(18);doc.setTextColor(27,58,107);doc.text("GARRIGUES FRÈRES",14,18);
  doc.setFontSize(11);doc.setTextColor(90);doc.text("Bon de commande",14,25);
  doc.setFontSize(10);doc.setTextColor(30);
  let y=34;orderMeta(o).forEach(([k,v])=>{doc.text(`${k} : ${v}`,14,y);y+=5.5;});
  doc.autoTable({
    startY:y+2,
    head:[["Variété","Cat.","Calibre","Cond.","Qté","PU HT","Total HT"]],
    body:lines.map(l=>[l.nom,l.cat,l.cal,l.cond,String(l.qty),l.pu!=null?l.pu.toFixed(2)+" €":"—",l.total!=null?l.total.toFixed(2)+" €":"—"]),
    foot:[["","","","","","Total HT",orderTotal(lines).toFixed(2)+" €"]],
    styles:{fontSize:9},headStyles:{fillColor:[27,58,107]},
    footStyles:{fillColor:[240,242,251],textColor:[27,58,107],fontStyle:"bold"},theme:"striped",
  });
  doc.save(`Commande_${o.id}.pdf`);
}

// ── JSONBin — 3 bins séparés (clients / tarifs / stock) ──
// Séparer les domaines évite les conflits d'écriture entre l'admin
// (tarifs, stock) et les clients (profils, commandes).
const JB_KEY="$2a$10$cKuUdmXcnO1I4JQciCfecer5o2jnvY2nRDiIpGdBEmwGPXafG/5wi";
const BIN_CLIENTS="69f86b6f856a682189a41f71"; // { [code]: {profile, orders} }
const BIN_TARIFS="6a291749da38895dfea5200f";  // objet tarifs
const BIN_STOCK="6a291762f5f4af5e29d6a80d";   // objet stock

const jbGet=async(bin,fallback)=>{
  try{
    const r=await fetch(`https://api.jsonbin.io/v3/b/${bin}/latest`,{headers:{"X-Master-Key":JB_KEY}});
    if(!r.ok)return fallback;
    const d=await r.json();
    return (d&&d.record!=null)?d.record:fallback;
  }catch{return fallback;}
};
const jbPut=async(bin,data)=>{
  try{
    const r=await fetch(`https://api.jsonbin.io/v3/b/${bin}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json","X-Master-Key":JB_KEY},
      body:JSON.stringify(data)
    });
    return r.ok;
  }catch(e){console.error("jbPut error",bin,e);return false;}
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
  // ── ALL HOOKS FIRST — no conditionals before hooks ───
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
  const[deliv,setDeliv]=useState({entreprise:"",prenom:"",adresse:"",codePostal:"",tel:"",email:"",semaine:""});
  const[editO,setEditO]=useState(null);
  const[fiche,setFiche]=useState(null);
  const[vw,setVw]=useState(typeof window!=="undefined"?window.innerWidth:430);
  const chatRef=useRef(null);
  const pollRef=useRef(null);
  const adminPollRef=useRef(null);

  // derived
  const me=uid?(db[uid]||{profile:null,orders:[]}):{profile:null,orders:[]};
  const profile=me.profile;
  const orders=me.orders||[];

  // ── mise en page responsive (mobile / tablette / ordinateur) ──
  const SHELL=vw>=760?640:430;            // pages lecture & formulaires
  const WIDE=vw>=1200?1180:vw>=760?940:430; // pages listes & grilles
  const GRID={display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:10,alignItems:"start"};

  // ── storage — JSONBin 3 bins ──────────────────────────
  const loadDb=async()=>await jbGet(BIN_CLIENTS,{});
  const saveDb=async d=>{await jbPut(BIN_CLIENTS,d);};
  const loadT=async()=>await jbGet(BIN_TARIFS,null);
  const saveT=async t=>{await jbPut(BIN_TARIFS,t);};
  const loadS=async()=>await jbGet(BIN_STOCK,null);
  const saveS=async s=>{await jbPut(BIN_STOCK,s);};

  // ── ALL useEffects HERE ───────────────────────────────
  useEffect(()=>{
    const f=()=>setVw(window.innerWidth);
    window.addEventListener("resize",f);
    return()=>window.removeEventListener("resize",f);
  },[]);

  useEffect(()=>{
    (async()=>{
      const[d,t,s]=await Promise.all([loadDb(),loadT(),loadS()]);
      setDb(d);
      if(t)setTarifs(p=>({...p,...t}));
      if(s)setStock(p=>({...p,...s}));
      setPage("login");
    })();
  },[]);

  // poll tarifs+stock for clients
  useEffect(()=>{
    if(!uid)return;
    pollRef.current=setInterval(async()=>{
      const[t,s]=await Promise.all([loadT(),loadS()]);
      if(t)setTarifs(p=>({...p,...t}));
      if(s)setStock(p=>({...p,...s}));
    },15000);
    return()=>clearInterval(pollRef.current);
  },[uid]);

  // reload full db for admin — but merge with current in-memory state to avoid overwriting recent orders
  useEffect(()=>{
    if(!adminOk){clearInterval(adminPollRef.current);return;}
    const reload=()=>loadDb().then(d=>{
      setDb(prev=>{
        // merge: for each user, keep whichever version has more orders
        const merged={...d};
        Object.keys(prev).forEach(k=>{
          const prevOrders=(prev[k]?.orders||[]);
          const loadedOrders=(d[k]?.orders||[]);
          if(prevOrders.length>=loadedOrders.length){
            merged[k]=prev[k];
          }
        });
        return merged;
      });
    });
    reload();
    adminPollRef.current=setInterval(reload,15000);
    return()=>clearInterval(adminPollRef.current);
  },[adminOk]);

  // ── db mutators ───────────────────────────────────────
  const mutate=useCallback(async(id,fn)=>{
    // 1) mise à jour locale optimiste — UI instantanée
    setDb(prev=>({...prev,[id]:fn(prev[id]||{profile:null,orders:[]})}));
    // 2) persistance : relire le bin clients, ne fusionner QUE ce client,
    //    puis réécrire. Évite d'écraser les données d'un autre client
    //    qui aurait commandé entre-temps (last-write-wins ciblé).
    try{
      const latest=await loadDb();
      const next={...latest,[id]:fn(latest[id]||{profile:null,orders:[]})};
      await saveDb(next);
      setDb(next);
    }catch(e){console.error("mutate error",e);}
  },[]);
  const setOrders=useCallback(async upd=>{if(!uid)return;await mutate(uid,cur=>({...cur,orders:typeof upd==="function"?upd(cur.orders||[]):upd}));},[uid,mutate]);
  const saveProfile=useCallback(async pf=>{if(!uid)return;await mutate(uid,cur=>({...cur,profile:pf}));},[uid,mutate]);
  const updT=async nt=>{setTarifs(nt);await saveT(nt);};
  const setStockStatus=async(id,status)=>{const ns={...stock,[id]:status};setStock(ns);await saveS(ns);};
  // statut d'un combo calibre/conditionnement, avec repli sur l'ancien statut
  // par variété (rétro-compat : stock[v.id] booléen ou chaîne).
  const combStatus=(v,c,i)=>{const k=`${v.id}__${c}__${i}`;return stStatus(stock[k]!=null?stock[k]:stock[v.id]);};
  // statut agrégé d'une variété (pour le catalogue) : rupture seulement si TOUT
  // est en rupture ; dispo s'il reste au moins un combo disponible.
  const varAgg=v=>{
    const ss=[];v.cal.forEach(c=>getConds(v).forEach((_,i)=>{if(cellFor(v.id,c,i))ss.push(combStatus(v,c,i));}));
    if(!ss.length)return"rupture";
    if(ss.every(s=>s==="rupture"))return"rupture";
    if(ss.some(s=>s==="dispo"))return"dispo";
    if(ss.some(s=>s==="demande"))return"demande";
    return"dispo";
  };

  // ── auth ──────────────────────────────────────────────
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
    // relire le bin clients pour vérifier l'unicité du code
    const fresh=await loadDb();
    if(fresh[c]){setAuthErr("Code déjà utilisé.");return;}
    const nd={...fresh,[c]:{profile:null,orders:[]}};
    await saveDb(nd);
    setDb(nd);setUid(c);setAuthErr("");setCode1("");setCode2("");setPage("catalogue");
  };
  const logout=()=>{setUid(null);setPage("login");setCode1("");setCode2("");setCart({});setAddTo(null);setFiche(null);setAdminOk(false);setAdminPw("");};

  // ── cart ──────────────────────────────────────────────
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
    const status=combStatus(v,cal,idx);
    return{key,varId:vid,cal,condIdx:idx,qty,v,cond:cs[idx],price:tarifs[key]||"",status,ok:status==="dispo"};
  }).filter(Boolean);
  const cTotal=cartItems.reduce((s,it)=>{const p=parseFloat(it.price);return s+((!it.ok||isNaN(p))?0:p*it.qty);},0);
  const cCount=Object.values(cart).reduce((a,b)=>a+(b>0?1:0),0);
  const cartBad=cartItems.some(it=>!it.ok);
  const setQ=useCallback((k,v)=>setCart(c=>({...c,[k]:Math.max(0,v)})),[]);
  const dOk=deliv.entreprise&&deliv.prenom&&deliv.adresse&&deliv.codePostal&&deliv.tel&&deliv.email&&deliv.semaine;

  const submitOrder=async()=>{
    const items=cartItems.filter(it=>it.ok); // garde-fou : jamais d'article non disponible
    if(!items.length||cartBad)return;
    const pf={entreprise:deliv.entreprise,prenom:deliv.prenom,adresse:deliv.adresse,codePostal:deliv.codePostal,tel:deliv.tel,email:deliv.email};
    await saveProfile(pf);
    if(addTo){
      await setOrders(os=>os.map(o=>o.id===addTo?{...o,items:[...o.items,...items.map(i=>({varId:i.varId,cal:i.cal,condIdx:i.condIdx,qty:i.qty}))]}:o));
      setAddTo(null);setCart({});setPage("orders");return;
    }
    const newItems=items.map(i=>({varId:i.varId,cal:i.cal,condIdx:i.condIdx,qty:i.qty,_sub:1}));
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

  const dlXlsx=o=>downloadOrderXLSX(o).catch(e=>{console.error(e);alert("Export Excel indisponible ici (la fonction /api/bdc nécessite le site déployé sur Vercel).");});
  const dlPdf=o=>downloadOrderPDF(o,tarifs).catch(e=>{console.error(e);alert("Export PDF indisponible ici (connexion requise / site déployé).");});

  const saveEdit=async()=>{
    if(!editO)return;
    await setOrders(os=>os.map(o=>o.id===editO.id?{...o,semaine:editO.semaine,client:{...o.client,adresse:editO.adresse,codePostal:editO.codePostal},items:editO.items}:o));
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

  // ── RENDER LOGIC (all hooks above, conditionals below) ─
  if(page==="splash")return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:SHELL,margin:"0 auto",minHeight:"100vh",background:`linear-gradient(160deg,${C.navy},#0d2347)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center",color:C.white}}><BN s={44}/><p style={{opacity:.5,fontSize:13,marginTop:8}}>Chargement…</p></div>
    </div>
  );

  if(!uid)return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:SHELL,margin:"0 auto",minHeight:"100vh",background:`linear-gradient(160deg,${C.navy},#0d2347)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28}}>
      <BN s={40}/><p style={{color:"rgba(255,255,255,.5)",fontSize:12,margin:"6px 0 32px",fontStyle:"italic"}}>Catalogue semences 2026</p>
      <div style={{width:"100%",maxWidth:420,background:"rgba(255,255,255,.07)",borderRadius:16,padding:24,border:"1.5px solid rgba(255,255,255,.15)"}}>
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

  if(page==="fiche"&&fiche){
    const v=fiche;const m=CAT[v.cat];const gc=gCal(v);const cs=getConds(v);const agg=varAgg(v);const dispo=agg!=="rupture";const SS=STOCK_STATES[agg];
    return(
      <div style={{fontFamily:"system-ui,sans-serif",maxWidth:SHELL,margin:"0 auto",minHeight:"100vh",background:C.light,display:"flex",flexDirection:"column"}}>
        <Hdr title={v.nom} onBack={()=>setPage("catalogue")}/>
        <div style={{background:m.l,borderBottom:`3px solid ${m.c}`,padding:"14px 16px",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <span style={{fontSize:44}}>{vemoji(v)}</span>
            <div>
              <h1 style={{margin:0,fontSize:20,fontWeight:900,color:C.navy}}>{v.nom}</h1>
              <span style={{background:m.c,color:C.white,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>{v.cat}</span>
              <span style={{marginLeft:6,background:SS.bg,color:SS.col,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>● {SS.lbl}</span>
            </div>
          </div>
        </div>
        <div style={{padding:14,flex:1,overflowY:"auto"}}>
          {[["⏱ Cycle",v.cycle],["🌾 Usage",v.usage],["🛡 Résistance",v.res],["🌱 Qualité",v.qual]].map(([k,val])=>(
            <div key={k} style={{background:C.white,borderRadius:10,padding:"9px 13px",marginBottom:6,boxShadow:"0 1px 3px #0001"}}>
              <div style={{fontSize:11,color:C.gray}}>{k}</div>
              <div style={{fontSize:14,fontWeight:600,color:C.text}}>{val}</div>
            </div>
          ))}
          {dispo&&(<>
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
              const key=`${v.id}__${gc}__${i}`;const cell=cellFor(v.id,gc,i);if(!cell)return null;
              const price=tarifs[key]||"";const qty=cart[key]||0;
              const cst=combStatus(v,gc,i);const CSS=STOCK_STATES[cst];const orderable=cst==="dispo";
              return(
                <div key={i} style={{background:C.white,borderRadius:12,padding:"11px 13px",marginBottom:7,boxShadow:"0 1px 3px #0001",display:"flex",alignItems:"center",gap:8,opacity:cst==="rupture"?0.6:1}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13,color:C.text,display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                      {cond}
                      {cst!=="dispo"&&<span style={{background:CSS.bg,color:CSS.col,borderRadius:20,fontSize:9,padding:"1px 7px",fontWeight:700}}>{CSS.lbl}</span>}
                    </div>
                    <div style={{fontSize:11,color:price?m.c:C.gray,fontWeight:price?700:400}}>{price?`${parseFloat(price).toFixed(2)} €/u`:"Prix sur demande"}</div>
                  </div>
                  {orderable
                    ?<QI qty={qty} onChange={n=>setQ(key,n)} color={m.c}/>
                    :<span style={{fontSize:11,color:CSS.col,fontWeight:700,whiteSpace:"nowrap"}}>{cst==="rupture"?"Indisponible":"Sur demande"}</span>}
                </div>
              );
            })}
            {cCount>0&&(
              <button onClick={()=>setPage("cart")} style={{width:"100%",marginTop:8,padding:13,borderRadius:12,border:"none",fontWeight:800,fontSize:14,cursor:"pointer",background:C.red,color:C.white}}>
                🛒 Voir ma sélection ({cCount})
              </button>
            )}
          </>)}
        </div>
      </div>
    );
  }

  if(editO)return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:SHELL,margin:"0 auto",minHeight:"100vh",background:C.light,display:"flex",flexDirection:"column"}}>
      <Hdr title="Modifier la commande" onBack={()=>setEditO(null)}/>
      <div style={{padding:14,flex:1,overflowY:"auto"}}>
        <h3 style={{color:C.navy,margin:"0 0 10px",fontSize:14}}>🚚 Livraison</h3>
        <div style={{marginBottom:8}}>
          <label style={{fontSize:11,color:C.gray,display:"block",marginBottom:2}}>Adresse de livraison</label>
          <input value={editO.adresse} onChange={e=>setEditO(o=>({...o,adresse:e.target.value}))}
            style={{width:"100%",padding:"8px 11px",borderRadius:9,border:`1.5px solid ${C.lgray}`,fontSize:13,boxSizing:"border-box",outline:"none"}}/>
        </div>
        <div style={{marginBottom:8}}>
          <label style={{fontSize:11,color:C.gray,display:"block",marginBottom:2}}>Code postal</label>
          <input value={editO.codePostal||""} onChange={e=>setEditO(o=>({...o,codePostal:e.target.value}))}
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
                <span style={{fontWeight:700,color:C.navy,fontSize:13}}>{vemoji(v)} {v.nom}</span>
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
                    {cs.map((c,i)=><option key={i} value={i}>{c}</option>)}
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

  if(page==="home")return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:SHELL,margin:"0 auto",minHeight:"100vh",background:`linear-gradient(160deg,${C.navy},#0d2347 60%,#111827)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28}}>
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

  if(page==="admin"){
    if(!adminOk)return(
      <div style={{fontFamily:"system-ui,sans-serif",maxWidth:SHELL,margin:"0 auto",minHeight:"100vh",background:C.light,display:"flex",flexDirection:"column"}}>
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
      <div style={{fontFamily:"system-ui,sans-serif",maxWidth:WIDE,margin:"0 auto",minHeight:"100vh",background:C.light,display:"flex",flexDirection:"column"}}>
        <Hdr title="Administration" onBack={()=>{setPage("home");setAdminOk(false);setAdminPw("");}}/>
        <div style={{display:"flex",borderBottom:`2px solid ${C.lgray}`,background:C.white,flexShrink:0,overflowX:"auto"}}>
          {[["tarifs","💰 Tarifs"],["stock","📦 Stock"],["commandes","🧾 Commandes"]].map(([t,l])=>(
            <button key={t} onClick={()=>setAdminTab(t)} style={{flex:1,padding:"11px 8px",border:"none",borderBottom:`3px solid ${adminTab===t?C.red:"transparent"}`,background:"none",fontWeight:700,fontSize:11,color:adminTab===t?C.red:C.gray,cursor:"pointer",whiteSpace:"nowrap"}}>{l}</button>
          ))}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:14}}>
          {adminTab==="tarifs"&&(<>
            <p style={{color:C.gray,fontSize:12,margin:"0 0 10px"}}>Prix mis à jour en temps réel pour tous les clients.</p>
            <div style={GRID}>
            {VS.map(v=>{const cs=getConds(v);return(
              <div key={v.id} style={{background:C.white,borderRadius:12,padding:"12px 14px",boxShadow:"0 1px 3px #0001"}}>
                <div style={{fontWeight:700,color:C.navy,marginBottom:8,fontSize:13}}>{vemoji(v)} {v.nom}</div>
                {v.cal.map(c=>(
                  <div key={c} style={{marginBottom:8}}>
                    {v.cal.length>1&&<div style={{fontSize:10,color:C.gray,fontWeight:700,marginBottom:4,textTransform:"uppercase"}}>Calibre {c}</div>}
                    {cs.map((cond,i)=>{const k=`${v.id}__${c}__${i}`;if(!cellFor(v.id,c,i))return null;return(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                        <span style={{flex:1,fontSize:12,color:C.text}}>{cond}</span>
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
            </div>
          </>)}
          {adminTab==="stock"&&(<>
            <p style={{color:C.gray,fontSize:12,margin:"0 0 12px"}}>Définissez le statut de chaque calibre / conditionnement : disponible, sur demande ou en rupture.</p>
            {["Pomme de terre","Échalote","Oignon","Ail"].map(cat=>(
              <div key={cat} style={{marginBottom:16}}>
                <div style={{fontWeight:700,color:C.navy,fontSize:13,marginBottom:8}}>{CAT[cat].e} {cat}</div>
                <div style={GRID}>
                {VS.filter(v=>v.cat===cat).map(v=>{const cs=getConds(v);return(
                  <div key={v.id} style={{background:C.white,borderRadius:12,padding:"12px 14px",boxShadow:"0 1px 3px #0001"}}>
                    <div style={{fontWeight:700,color:C.navy,marginBottom:8,fontSize:13}}>{vemoji(v)} {v.nom}</div>
                    {v.cal.map(c=>(
                      <div key={c} style={{marginBottom:8}}>
                        {v.cal.length>1&&<div style={{fontSize:10,color:C.gray,fontWeight:700,marginBottom:4,textTransform:"uppercase"}}>Calibre {c}</div>}
                        {cs.map((cond,i)=>{
                          const k=`${v.id}__${c}__${i}`;if(!cellFor(v.id,c,i))return null;const cst=combStatus(v,c,i);const CSS=STOCK_STATES[cst];
                          return(
                            <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                              <span style={{flex:1,fontSize:12,color:C.text}}>{cond}</span>
                              <span style={{fontSize:13,color:CSS.col}}>●</span>
                              <select value={cst} onChange={e=>setStockStatus(k,e.target.value)}
                                style={{padding:"4px 6px",borderRadius:8,border:`1.5px solid ${CSS.col}`,fontSize:11,color:CSS.col,fontWeight:700,cursor:"pointer",background:C.white}}>
                                <option value="dispo">Disponible</option>
                                <option value="demande">Sur demande</option>
                                <option value="rupture">Rupture</option>
                              </select>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                );})}
                </div>
              </div>
            ))}
          </>)}
          {adminTab==="commandes"&&(
            allOrders.length===0?<p style={{color:C.gray,textAlign:"center",padding:40}}>Aucune commande.</p>
            :<div style={GRID}>{allOrders.map(o=>{
              const updS=e=>{const s=e.target.value;setDb(prev=>{const cur=prev[o._code]||{};const nxt={...prev,[o._code]:{...cur,orders:(cur.orders||[]).map(x=>x.id===o.id?{...x,status:s}:x)}};saveDb(nxt);return nxt;});};
              const subs=o.subCount||1;
              const hasDemande=(o.items||[]).some(it=>{const vv=VS.find(x=>x.id===it.varId);return vv?combStatus(vv,it.cal,it.condIdx)==="demande":false;});
              return(
                <div key={o.id} style={{background:C.white,borderRadius:12,padding:14,boxShadow:"0 1px 3px #0001"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <span style={{fontWeight:700,color:C.navy,fontSize:13}}>{o.id}</span>
                    <select value={ORDER_KEYS.includes(o.status)?o.status:"en attente"} onChange={updS} style={{padding:"3px 8px",borderRadius:8,border:`1.5px solid ${C.lgray}`,fontSize:11,color:oState(o.status).col,fontWeight:700,cursor:"pointer"}}>
                      {ORDER_KEYS.map(k=><option key={k} value={k}>{ORDER_STATES[k].emo} {ORDER_STATES[k].lbl}</option>)}
                    </select>
                  </div>
                  {hasDemande&&<div style={{fontSize:10,color:"#CA8A04",background:"#FEF9C3",borderRadius:8,padding:"3px 8px",display:"inline-block",marginBottom:6,fontWeight:700}}>🟡 Contient un article « sur demande »</div>}
                  <div style={{fontSize:11,color:C.gray,marginBottom:2}}>📅 {o.date} · {o.client?.entreprise} · {o.client?.prenom}</div>
                  <div style={{fontSize:11,color:C.gray,marginBottom:2}}>📍 {o.client?.adresse}{o.client?.codePostal?` · ${o.client.codePostal}`:""} · ✉️ {o.client?.email}</div>
                  <div style={{fontSize:11,color:C.navy,fontWeight:700,marginBottom:6}}>🚚 {fmtW(o.semaine)}</div>
                  {subs>1&&<div style={{fontSize:11,color:C.white,background:C.navy,borderRadius:20,padding:"2px 10px",display:"inline-block",marginBottom:6}}>{subs} commandes groupées</div>}
                  {o.items.map((it,idx)=>{const v=VS.find(x=>x.id===it.varId);const cd=getConds(v)[it.condIdx];const sc=SUBCOLS[((it._sub||1)-1)%SUBCOLS.length];const sl=SUBLBL[((it._sub||1)-1)%SUBLBL.length];return(
                    <div key={idx} style={{fontSize:12,color:C.text,padding:"2px 0",display:"flex",alignItems:"center",gap:6}}>
                      {subs>1&&<span style={{width:18,height:18,borderRadius:"50%",background:sc,color:C.white,fontSize:9,fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{sl}</span>}
                      {v?.nom} — cal.{it.cal} — {cd} × {it.qty}
                    </div>
                  );})}
                </div>
              );
            })}</div>
          )}
        </div>
      </div>
    );
  }

  if(page==="orders")return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:WIDE,margin:"0 auto",minHeight:"100vh",background:C.light,display:"flex",flexDirection:"column"}}>
      <Hdr title="Mes commandes" onBack={()=>setPage("home")}/>
      <div style={{padding:14,flex:1,overflowY:"auto"}}>
        {orders.length===0?(
          <div style={{textAlign:"center",padding:"40px 0",color:C.gray}}>
            <div style={{fontSize:40}}>📭</div><p style={{margin:"8px 0 16px"}}>Aucune commande.</p>
            <button onClick={()=>setPage("catalogue")} style={{background:C.navy,color:C.white,border:"none",borderRadius:10,padding:"10px 20px",cursor:"pointer",fontWeight:700}}>Voir le catalogue</button>
          </div>
        ):(<div style={GRID}>{orders.map(o=>{
          const subs=o.subCount||1;
          return(
            <div key={o.id} style={{background:C.white,borderRadius:14,padding:14,boxShadow:"0 1px 5px #0001"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <span style={{fontWeight:800,color:C.navy,fontSize:13}}>{o.id}</span>
                <span style={{fontSize:11,fontWeight:700,color:oState(o.status).col,background:oState(o.status).bg,padding:"3px 10px",borderRadius:20}}>
                  {oState(o.status).emo} {oState(o.status).lbl}
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
              <div style={{fontSize:11,color:C.gray,marginBottom:6}}>📍 {o.client?.adresse}{o.client?.codePostal?` · ${o.client.codePostal}`:""}</div>
              {o.items.map((it,idx)=>{
                const v=VS.find(x=>x.id===it.varId);const cd=getConds(v)[it.condIdx];
                const sc=SUBCOLS[((it._sub||1)-1)%SUBCOLS.length];const sl=SUBLBL[((it._sub||1)-1)%SUBLBL.length];
                return(
                  <div key={idx} style={{fontSize:12,color:C.text,padding:"2px 0",display:"flex",alignItems:"center",gap:6}}>
                    {subs>1&&<span style={{width:18,height:18,borderRadius:"50%",background:sc,color:C.white,fontSize:9,fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{sl}</span>}
                    {v?.nom} — cal. {it.cal} — {cd} × {it.qty}
                  </div>
                );
              })}
              {o.status==="en attente"&&(
                <div style={{display:"flex",gap:8,marginTop:10}}>
                  <button onClick={()=>{setAddTo(o.id);setCart({});setPage("catalogue");}}
                    style={{flex:1,padding:"8px",borderRadius:10,border:`1.5px solid ${C.navy}`,background:"#fff",color:C.navy,fontWeight:700,fontSize:12,cursor:"pointer"}}>➕ Ajouter</button>
                  <button onClick={()=>setEditO({...o,adresse:o.client?.adresse||"",codePostal:o.client?.codePostal||""})}
                    style={{flex:1,padding:"8px",borderRadius:10,border:`1.5px solid ${C.orange}`,background:"#FFF7ED",color:C.orange,fontWeight:700,fontSize:12,cursor:"pointer"}}>✏️ Modifier</button>
                </div>
              )}
              <div style={{display:"flex",gap:8,marginTop:8,paddingTop:8,borderTop:`1px solid ${C.lgray}`}}>
                <button onClick={()=>dlXlsx(o)}
                  style={{flex:1,padding:"8px",borderRadius:10,border:`1.5px solid ${C.green}`,background:"#F0FDF4",color:C.green,fontWeight:700,fontSize:12,cursor:"pointer"}}>⬇ Excel</button>
                <button onClick={()=>dlPdf(o)}
                  style={{flex:1,padding:"8px",borderRadius:10,border:`1.5px solid ${C.red}`,background:"#FEF2F2",color:C.red,fontWeight:700,fontSize:12,cursor:"pointer"}}>⬇ PDF</button>
              </div>
            </div>
          );
        })}</div>)}
      </div>
    </div>
  );

  if(page==="cart")return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:SHELL,margin:"0 auto",minHeight:"100vh",background:C.light,display:"flex",flexDirection:"column"}}>
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
          {cartItems.map(it=>{const mm=CAT[it.v.cat];const SS=STOCK_STATES[it.status];return(
            <div key={it.key} style={{background:C.white,borderRadius:12,padding:"10px 13px",marginBottom:7,boxShadow:"0 1px 3px #0001",display:"flex",alignItems:"center",gap:9,border:it.ok?"none":`1.5px solid ${SS.col}`,opacity:it.ok?1:.85}}>
              <span style={{fontSize:22}}>{vemoji(it.v)}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,fontSize:12,color:C.text,display:"flex",alignItems:"center",gap:6}}>
                  <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{it.v.nom}</span>
                  {!it.ok&&<span style={{background:SS.bg,color:SS.col,borderRadius:20,fontSize:9,padding:"1px 7px",fontWeight:700,flexShrink:0}}>{SS.lbl}</span>}
                </div>
                <div style={{fontSize:10,color:C.gray}}>Cal. {it.cal} · {it.cond}{it.price?` · ${parseFloat(it.price).toFixed(2)} €/u`:""}</div>
              </div>
              <QI qty={it.qty} onChange={n=>setQ(it.key,n)} color={mm.c}/>
            </div>
          );})}
          {cartBad&&<div style={{background:"#FEF2F2",border:`1.5px solid ${C.red}`,borderRadius:10,padding:"9px 13px",marginBottom:12,fontSize:12,color:C.red,fontWeight:600}}>
            ⚠️ Un ou plusieurs articles ne sont plus disponibles (sur demande ou rupture). Retirez-les (quantité à 0) pour valider votre commande.
          </div>}
          {cTotal>0&&<div style={{background:C.navy,borderRadius:12,padding:"9px 16px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:"rgba(255,255,255,.7)",fontSize:12}}>Total estimé</span>
            <span style={{color:C.white,fontWeight:900,fontSize:17}}>{cTotal.toFixed(2)} €</span>
          </div>}
          {!addTo&&(<>
            <h3 style={{color:C.navy,margin:"12px 0 4px",fontSize:14}}>📋 Informations de livraison</h3>
            <p style={{color:C.gray,fontSize:11,margin:"0 0 8px"}}>Vérifiez et modifiez si nécessaire. <span style={{color:C.red}}>* Obligatoires</span></p>
            {[["Nom de l'entreprise","entreprise","text"],["Votre prénom","prenom","text"],["Adresse de livraison","adresse","text"],["Code postal","codePostal","text"],["Téléphone","tel","tel"],["Email","email","email"]].map(([lbl,fld,type])=>(
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
            <button onClick={submitOrder} disabled={!dOk||cartBad}
              style={{width:"100%",padding:13,borderRadius:12,border:"none",fontWeight:800,fontSize:14,cursor:(dOk&&!cartBad)?"pointer":"not-allowed",marginTop:4,background:(dOk&&!cartBad)?C.red:"#CBD5E1",color:C.white}}>
              Confirmer la commande 🚀
            </button>
          </>)}
          {addTo&&<button onClick={submitOrder} disabled={cartBad}
            style={{width:"100%",padding:13,borderRadius:12,border:"none",fontWeight:800,fontSize:14,cursor:cartBad?"not-allowed":"pointer",marginTop:4,background:cartBad?"#CBD5E1":C.red,color:C.white}}>Ajouter à la commande ➕</button>}
        </>)}
      </div>
    </div>
  );

  if(page==="chat")return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:SHELL,margin:"0 auto",height:"100vh",display:"flex",flexDirection:"column",background:C.light}}>
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

  // CATALOGUE (default)
  return(
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:WIDE,margin:"0 auto",minHeight:"100vh",background:C.light}}>
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
        <div style={GRID}>
        {filtered.map(v=>{
          const m=CAT[v.cat];const cs=getConds(v);
          const inCart=v.cal.some(c=>cs.some((_,i)=>cart[`${v.id}__${c}__${i}`]>0));
          const fp=tarifs[`${v.id}__${v.cal[0]}__0`];
          const st=varAgg(v);const dispo=st!=="rupture";
          return(
            <div key={v.id}
              onClick={()=>{ if(!dispo)return; setFiche(v); setPage("fiche"); }}
              style={{background:C.white,borderRadius:13,padding:"11px 13px",boxShadow:"0 1px 3px #0001",border:`2px solid ${inCart?m.c:C.lgray}`,cursor:dispo?"pointer":"not-allowed",opacity:dispo?1:0.55}}>
              <div style={{display:"flex",alignItems:"center",gap:11,pointerEvents:"none"}}>
                <span style={{fontSize:28}}>{vemoji(v)}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:2,flexWrap:"wrap"}}>
                    <span style={{fontWeight:800,fontSize:14,color:C.navy}}>{v.nom}</span>
                    {inCart&&<span style={{background:m.c,color:C.white,borderRadius:20,fontSize:9,padding:"2px 7px",fontWeight:700}}>✓</span>}
                    {st==="rupture"&&<span style={{background:"#FEE2E2",color:C.red,borderRadius:20,fontSize:9,padding:"2px 7px",fontWeight:700}}>Rupture</span>}
                    {st==="demande"&&<span style={{background:"#FFF7ED",color:C.orange,borderRadius:20,fontSize:9,padding:"2px 7px",fontWeight:700}}>Sur demande</span>}
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
        </div>
        <div style={{height:20}}/>
      </div>
    </div>
  );
}
