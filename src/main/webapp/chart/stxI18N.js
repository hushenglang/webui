// Be sure your webserver is set to deliver UTF-8 charset
// For apache add "AddDefaultCharset UTF-8" to httpd.conf
// otherwise use \u unicode escapes for non-ascii characters


function STXI18N(){}

// Hack code to make a multi line string easy cut & paste from a spreadsheet
STXI18N.hereDoc=function(f){
	return f.toString().replace(/^[^\/]+\/\*!?/,'').replace(/\*\/[^\/]+$/,'');
};

// Paste translation spreadsheet inbetween the comment tags.
STXI18N.csv=STXI18N.hereDoc(function(){/*!en,ar,fr,de,hu,it,pu,ru,es,zh,ja
Chart,الرسم البياني,Graphique,Darstellung,Diagram,Grafico,Gráfico,График,Gráfica,图表,チャート
Chart Style,أسلوب الرسم البياني,Style de graphique,Darstellungsstil,Diagram stílusa,Stile grafico,Estilo do gráfico,Тип графика,Estilo de gráfica,图表类型,チャート形式
Candle,الشموع,Bougie,Kerze,Gyertya,Candela,Vela japonesa,Свеча,Vela,蜡烛,ローソク足
Bar,الأعمدة,Barre,Balken,Sáv,Barra,Barras,Бар,Barra,直线,棒
Colored Bar,الأعمدة الملونة,Barre en couleur,Farbiger Balken,Színes sáv,Barra colorata,Barras coloridas,Цветной бар,Barra de color,彩线,カラー棒
Line,الخطوط,Ligne,Linie,Vonal,Linea,Linha,Линия,Línea,曲线,線
Hollow Candles,الشموع المفرغة,Bougies creuses,Hohlkerzen,Üres gyertyák,Candele Vuote,Vela vazia,Пустые свечи,Velas huecas,空心蜡烛,陽線ローソク足
Chart Scale,مقياس الرسم البياني,Échelle du graphique,Darstellungsskala,Diagram beosztás,Scala Grafico,Escala do gráfico,Шкала графика,Escala de la gráfica,图表尺度,チャート目盛
Log Scale,المقياس اللوغارتمي,Logarithmique,Log-Skala,Logaritmikus beosztás,Scala Log,Logarítmica,Лог. шкала,Logaritmo,对数尺度,対数目盛
Clear Drawings,مسح الرسومات,Éliminer les graphiques,Deutliche Zeichnungen,Ábrák törlése,Cancella Disegni,Limpar desenhos,Удалить изображения,Eliminar los dibujos,清空图示,描画をクリア
Studies,دراسات,Études,Studien,Elemzések,Studi,Estudos,Моделирование,Estudios,研究,スタディ
Timezone,المنطقة الزمنية,Plage horaire,Zeitzone,Időzóna,Fuso orario,Fuso horário,Часовой пояс,Zona horaria,时区,タイムゾーン
Change Timezone,تغيير المنطقة الزمنية,Modifier la plage horaire,Zeitzone ändern,Időzóna módosítása,Cambia fuso orario,Alterar fuso horário,Изменить часовой пояс,Cambiar zona horaria,更改时区,タイムゾーンの変更
Default Themes,الأنساق الافتراضية,Modèles de graphiques par défaut,Standardlayouts,Alapértelmezett témák,Temi di default,Temas padrão,Исходные темы,Temas predeterminados,默认主题,既定のテーマ
White,أبيض,Blanc,Weiß,Fehér,Bianco,Branco,Белая,Blanco,白色,白
Black,أسود,Noir,Schwarz,Fekete,Nero,Preto,Черная,Negro,黑色,黒
Custom Themes,أنساق مخصصة,Modèles personnalisés,Individuelle Layouts,Egyedi témák,Personalizza temi,Temas personalizados,Пользовательские темы,Temas personalizados,自定义主题,カスタムテーマ
New Custom Theme,نسق جديد مخصص,Nouveau modèle personnalisé,Neue individuelle Layouts,Új egyedi téma,Nuovo Tema Personalizzato,Novo tema personalizado,Создать пользовательскую тему,Nuevo tema personalizado,新自定义主题,新規カスタムテーマ
Select Tool,حدد أداة,Sélectionner,Werkzeug,Eszköz,Seleziona,Selecionar,Выбор,Seleccionar,选择工具,ツールの選択
None,لا شيء,Aucune,Keines,Egyik sem,Nessuno,Nenhuma,Без,Ninguna,无,なし
Crosshairs,علامات \"+\",Croix,Fadenkreuze,Célkeresztek,Mirini,Mira,Перекрестья,Cruz visor,十字线,十字
Annotation,تعليق توضيحي,Annotation,Anmerkung,Magyarázat,Annotazione,Anotação,Примечание,Anotación,注释,注釈
Horizontal,أفقي,Horizontal,Horizontal,Vízszintes,Orizzontale,Horizontal,Горизонт.,Horizontal,水平,水平
Segment,قطاع,Segment,Segment,Szegmens,Segmento,Segmento,Сегмент,Segmento,细分,区切り
Fill,التعبئة,Remplir,Füllen,Kitöltés,Riempimento,Preenchimento,Заливка,Relleno,填充,塗りつぶし
Line,خط,Ligne,Linie,Vonal,Linea,Linha,Линия,Línea,线条,線
save,حفظ,Sauvegarder,speichern,mentés,salva,guardado,сохранение,guardar,存档,保存
cancel,إلغاء,Annuler,abbrechen,mégse,annulla,cancelamento,отмена,cancelar,取消,キャンセル
Close,إغلاق,Fermer,Schließen,Bezárás,Chiudi,Fecho,Закрыть,Cerrar,关闭,閉じる
Create,إنشاء,Créer,Erstellen,Létrehozás,Crea,Criação,Создать,Crear,创建,新規作成
Show Zones,عرض المناطق,Afficher des zones,Zonen anzeigen,Zónák megjelenítése,Mostra Zone,Mostrar zonas,Показать зоны,Mostrar zonas,显示区域,ゾーンの表示
OverBought,مُبَالَغ في الشراء,Suracheté,Überkauft,Túlvásárolt,Ipercomprato,Sobrecompra,OverBought (перекупленность),Exceso compra,超买,買い持ち
OverSold,مُبَالَغ في البيع,Survendu,Überverkauft,Túlértékesített,Ipervenduto,Sobrevenda,OverSold (перепроданность),Exceso venta,超卖,売り持ち
Choose Timezone,اختر منطقة زمنية,Choisir la plage horaire,Zeitzone wählen,Időzóna kiválasztása,Scegli Fuso orario,Escolher o fuso horário,Выбор врем. пояса,Elegir zona horaria,选择时区,タイムゾーンの選択
Create a New Custom Theme,إنشاء نسق جديد,Créer un nouveau modèle personnalisé,Neues individuelles Layout erstellen,Új egyedi téma létrehozása,Crea Nuovo Tema Personalizzato,Criar novo tema personalizado,Создать новую пользовательскую тему,Crear un nuevo tema personalizado,创建新的自定义主题,カスタムテーマの新規作成
Candles,شموع,Bougies,Kerzen,Gyertyák,Candele,Velas,Свечи,Velas,蜡烛,ローソク足
Border,الحدود,Ligne frontière,Rand,Szegély,Margine,Limite,Контур,Borde,边框,境界
Background,الخلفية,Contexte,Hintergrund,Háttér,Sfondo,Fundo,Фон,Fondo,背景,背景
Grid Lines,خطوط الشبكة,Lignes de quadrillage,Gitterlinien,Rácsvonalak,Griglia,Linhas grelha,Линии сетки,Líneas de cuadrícula,网格线,グリッド線
Date Dividers,فواصل التاريخ,Caractères de séparation,Datentrenner,Dátumelválasztók,Divisori Data,Divisores de data,Раздел. полей дат,Divisores de fecha,日期分隔符,日付区切り
Axis Text,بيان المحاور,Titres des axes,Achsentext,Tengely szövege,Testo Asse,Texto eixo,Название оси,Texto del eje,轴标题,軸ラベル
New Theme Name,اسم النسق الجديد,Nom du nouveau modèle,Neuer Layoutname,Új téma neve,Nome Nuovo Tema,Novo nome do tema,Название темы,Nombre del nuevo tema,新主题名称,新規テーマ名
Save Theme,حفظ النسق,Sauvegarder,Speichern,Téma mentése,Salva Tema,Guardar,Сохранить,Guardar,保存主题,テーマの保存
*/});

STXI18N.language="en";
STXI18N.longMonths={"zh":true,"ja":true};	// Prints entire month from locale for languages that don't support shortening
STXI18N.wordLists={
		"en":{"1D":"",
			"1 D":"",
			"3 D":"",
			"1 W":"",
			"2 Wk":"",
			"1 Mo":"",
			"5 Min":"",
			"10 Min":"",
			"15 Min":"",
			"30 Min":"",
			"1 hour":"",
			"Chart":"",
			"Chart Style":"",
			"Candle":"",
			"Bar":"",
			"Colored Bar":"",
			"Line":"",
			"Hollow Candles":"",
			"Chart Scale":"",
			"Log Scale":"",
			"Studies":"",
			"Accumulative Swing Index":"",
			"Aroon":"",
			"Aroon Oscillator":"",
			"Average True Range":"",
			"Bollinger Bands":"",
			"Center Of Gravity":"",
			"Chaikin Money Flow":"",
			"Chaikin Volatility":"",
			"Chande Forecast Oscillator":"",
			"Chande Momentum Oscillator":"",
			"Commodity Channel Index":"",
			"Coppock Curve":"",
			"Detrended Price Oscillator":"",
			"Directional Movement System":"",
			"Ease of Movement":"",
			"Ehler Fisher Transform":"",
			"Elder Force Index":"",
			"Elder Ray":"",
			"Fractal Chaos Bands":"",
			"Fractal Chaos Oscillator":"",
			"Gopalakrishnan Range Index":"",
			"High Low Bands":"",
			"High Minus Low":"",
			"Highest High Value":"",
			"Historical Volatility":"",
			"Intraday Momentum Index":"",
			"Keltner Channel":"",
			"Klinger Volume Oscillator":"",
			"Linear Reg Forecast":"",
			"Linear Reg Intercept":"",
			"Linear Reg R2":"",
			"Linear Reg Slope":"",
			"Lowest Low Value":"",
			"MACD":"",
			"Mass Index":"",
			"Median Price":"",
			"Momentum Oscillator":"",
			"Money Flow Index":"",
			"Moving Average":"",
			"Moving Average Envelope":"",
			"Negative Volume Index":"",
			"On Balance Volume":"",
			"Parabolic SAR":"",
			"Performance Index":"",
			"Positive Volume Index":"",
			"Pretty Good Oscillator":"",
			"Price Oscillator":"",
			"Price Rate of Change":"",
			"Price Volume Trend":"",
			"Prime Number Bands":"",
			"Prime Number Oscillator":"",
			"QStick":"",
			"Random Walk Index":"",
			"RAVI":"",
			"RSI":"",
			"Schaff Trend Cycle":"",
			"Standard Deviation":"",
			"Stochastics":"",
			"Stochastic Momentum Index":"",
			"Stochastic Oscillator":"",
			"Swing Index":"",
			"Time Series Forecast":"",
			"Trade Volume Index":"",
			"TRIX":"",
			"True Range":"",
			"Twiggs Money Flow":"",
			"Typical Price":"",
			"Ultimate Oscillator":"",
			"Vertical Horizontal Filter":"",
			"Volume":"",
			"Vol Underlay":"",
			"Volume Oscillator":"",
			"Volume Rate of Change":"",
			"Weighted Close":"",
			"Williams %R":"",
			"Williams Accumulation Distribution":"",
			"Timezone":"",
			"Change Timezone":"",
			"Default Themes":"",
			"Light":"",
			"Dark":"",
			"Custom Themes":"",
			"New Custom Theme":"",
			"Select Tool":"",
			"None":"",
			"Crosshairs":"",
			"Annotation":"",
			"Fibonacci":"",
			"Horizontal":"",
			"Ray":"",
			"Segment":"",
			"Rectangle":"",
			"Ellipse Center":"",
			"Ellipse Left":"",
			"Fill:":"",
			"Line:":"",
			"O: ":"",
			"H: ":"",
			"V: ":"",
			"C: ":"",
			"L: ":"",
			"save":"",
			"cancel":"",
			"Create":"",
			"Show Zones":"",
			"OverBought":"",
			"OverSold":"",
			"Choose Timezone":"",
			"Close":"",
			"Shared Chart URL":"",
			"Share This Chart!":"",
			"Create a New Custom Theme":"",
			"Candles":"",
			" Border":"",
			"Line/Bar/Wick":"",
			"Background":"",
			"Grid Lines":"",
			"Date Dividers":"",
			"Axis Text":"",
			"New Theme Name:":"",
			"Save Theme":"",
			"rsi":"",
			"Period":"",
			"ma":"",
			"Field":"",
			"Type":"",
			"MA":"",
			"macd":"",
			"Fast MA Period":"",
			"Slow MA Period":"",
			"Signal Period":"",
			"Signal":"",
			"stochastics":"",
			"Smooth":"",
			"Fast":"",
			"Slow":"",
			"Aroon Up":"",
			"Aroon Down":"",
			"Lin R2":"",
			"RSquared":"",
			"Lin Fcst":"",
			"Forecast":"",
			"Lin Incpt":"",
			"Intercept":"",
			"Time Fcst":"",
			"VIDYA":"",
			"R2 Scale":"",
			"STD Dev":"",
			"Standard Deviations":"",
			"Moving Average Type":"",
			"Trade Vol":"",
			"Min Tick Value":"",
			"Swing":"",
			"Limit Move Value":"",
			"Acc Swing":"",
			"Price Vol":"",
			"Pos Vol":"",
			"Neg Vol":"",
			"On Bal Vol":"",
			"Perf Idx":"",
			"Stch Mtm":"",
			"%K Periods":"",
			"%K Smoothing Periods":"",
			"%K Double Smoothing Periods":"",
			"%D Periods":"",
			"%D Moving Average Type":"",
			"%K":"",
			"%D":"",
			"Hist Vol":"",
			"Bar History":"",
			"Ultimate":"",
			"Cycle 1":"",
			"Cycle 2":"",
			"Cycle 3":"",
			"W Acc Dist":"",
			"Vol Osc":"",
			"Short Term Periods":"",
			"Long Term Periods":"",
			"Points Or Percent":"",
			"Chaikin Vol":"",
			"Rate Of Change":"",
			"Price Osc":"",
			"Long Cycle":"",
			"Short Cycle":"",
			"EOM":"",
			"CCI":"",
			"Detrended":"",
			"Aroon Osc":"",
			"Elder Force":"",
			"Ehler Fisher":"",
			"EF":"",
			"EF Trigger":"",
			"Schaff":"",
			"Coppock":"",
			"Chande Fcst":"",
			"Intraday Mtm":"",
			"Random Walk":"",
			"Random Walk High":"",
			"Random Walk Low":"",
			"Directional":"",
			"ADX":"",
			"DI+":"",
			"DI-":"",
			"High Low":"",
			"High Low Bands Top":"",
			"High Low Bands Median":"",
			"High Low Bands Bottom":"",
			"MA Env":"",
			"Shift Percentage":"",
			"Envelope Top":"",
			"Envelope Median":"",
			"Envelope Bottom":"",
			"Fractal High":"",
			"Fractal Low":"",
			"Prime Bands Top":"",
			"Prime Bands Bottom":"",
			"Bollinger Band Top":"",
			"Bollinger Band Median":"",
			"Bollinger Band Bottom":"",
			"Keltner":"",
			"Shift":"",
			"Keltner Top":"",
			"Keltner Median":"",
			"Keltner Bottom":"",
			"PSAR":"",
			"Minimum AF":"",
			"Maximum AF":"",
			"Klinger":"",
			"Signal Periods":"",
			"KlingerSignal":"",
			"Elder Bull Power":"",
			"Elder Bear Power":"",
			"LR Slope":"",
			"Slope":""}
};


/* Returns a word list containing unique words. Each word references an array of DOM
 * nodes that contain that word. This can then be used for translation.
 */
STXI18N.findAllTextNodes=function(){
    var walker = document.createTreeWalker(
        document.body, 
        NodeFilter.SHOW_TEXT, 
        null, 
        false
    );

    var node;
	var ws=new RegExp("^\\s*$");
	var wordList={};

    while(node = walker.nextNode()) {
        if(!ws.test(node.nodeValue)){
        	if(node.parentNode.tagName=="SCRIPT") continue;
        	if(wordList[node.nodeValue]==null) wordList[node.nodeValue]=[];
			wordList[node.nodeValue].push(node);
		}
    }
    // Get all the words from the study library that are used to populate the study dialogs.
    // These will have an empty array since they aren't associated with any nodes
    if(STXStudies.studyLibrary){
    	for(var study in STXStudies.studyLibrary){
        	if(wordList[study]==null) wordList[study]=[];
        	var s=STXStudies.studyLibrary[study];
        	if(s.inputs){
        		for(var input in s.inputs){
                	if(wordList[input]==null) wordList[input]=[];
        		}
        	}
        	if(s.outputs){
        		for(var output in s.outputs){
                	if(wordList[output]==null) wordList[output]=[];
        		}
        	}
    	}
    }
	return wordList;
};

/*
 * STXI18N.missingWordList will scan the UI by walking all the text elements. It will determine which
 * text elements have not been translated for the given language and return those as a JSON object.
 */
STXI18N.missingWordList=function(language){
	if(!language) language=STXI18N.language;
	var wordsInUI=STXI18N.findAllTextNodes();
	var missingWords={};
	var languageWordList=STXI18N.wordLists[language];
	if(!languageWordList) languageWordList={};
	for(var word in wordsInUI){
		if(typeof languageWordList[word]=="undefined"){
			missingWords[word]="";
		}
	}
	return missingWords;
};

/*
 * A convenient function for creating a human readable JSON object suitable for delivery to a translator.
 */
STXI18N.printableMissingWordList=function(language){
	var missingWords=JSON.stringify(STXI18N.missingWordList(language));
	missingWords=missingWords.replace("\",\"","\",\n\"", "\g");
	return missingWords;
};

/*
 * Passes through the UI and translates all of the text for the given language.
 */
STXI18N.translateUI=function(language){
	if(!language) language=STXI18N.language;
	var wordsInUI=STXI18N.findAllTextNodes();
	var languageWordList=STXI18N.wordLists[language];
	if(!languageWordList) return;
	for(var word in wordsInUI){
		var translation=languageWordList[word];
		if(!translation) continue;
		var nodes=wordsInUI[word];
		for(var i=0;i<nodes.length;i++){
			nodes[i].data=translation;
		}
	}
};

/*
 * Translates an individual word for a given language. Set stxx.translationCallback to this function
 * in order to automatically translate all textual elements on the chart itself.
 */
STXI18N.translate=function(word, language){
	if(!language) language=STXI18N.language;
	var languageWordList=STXI18N.wordLists[language];
	if(!languageWordList) return word;
	var translation=languageWordList[word];
	if(!translation) return word;
	return translation;
};


/*
 * This method dynamically loads the locale using JSONP. Once the locale is loaded then the chart widget itself
 * is updated for that locale. Use this function when a user can select a locale dynamically so as to avoid
 * having to include specific locale entries as <script> tags. The optional callback will be called when the locale
 * has been set. The callback will be called with null on success, otherwise with an error message.
 */
STXI18N.setLocale=function(stx, locale, cb){
	if(window.OldIntl){	// Intl built into browser
    	stx.setLocale(locale);
    	if(cb) cb(null);
		return;
	}
	var localeFileURL="locale-data/jsonp/" + locale + ".js";
	var script=document.createElement("SCRIPT");
	script.async = true;
	script.src = localeFileURL;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s.nextSibling);
    script.onload=function(){
    	stx.setLocale(locale);
    	if(cb) cb(null);
    };
    script.onerror=function(){
    	if(cb) cb("cannot load script");
    };
};

/****** BEGIN DEPRECATED (use STXI18N.wordLists) *****/
var stxWordList={
	"bars":"barren",
	"----General study inputs----":"",
	"Period":"Zeitraum",
	"Field":"Feld",
	"Type":"Typ",
	"----Moving average types ----":"",
	"Simple":"Einfach",
	"Exponential":"Exponentiellen",
	"Time Series":"Zeitreihen",
	"Triangular":"Dreieckigen",
	"Variable":"Variable",
	"Weighted":"Gewichteter",
	"Wells Wilder":"Wells Wilder",
	"----- MA lowercase -----":"",
	"simple":"einfach",
	"exponential":"exponentiellen",
	"time series":"zeitreihen",
	"triangular":"dreieckigen",
	"variable":"variable",
	"weighted":"gewichteter",
	"wells wilder":"wells wilder",
	"----Study outputs and inputs ----":"copy from stxStudies.js studyLibrary",
	"MA":"GD",
	"Close":"Schluss",
	"Open":"Eröffnen",
	"High":"Hoch",
	"Low":"Tief",
	"Volume":"Volumen",
	"Adj_Close":"Adj_Schluss",
	"Fast MA Period":"Schnelle GD-Zeitraum",
	"Slow MA Period":"Langsame GD-Zeitraum",
	"Signal Period":"Signalperiode",
	"----- Study names -----":"copy from stxStudies.js studyLibrary",
	"ma":"gd",
	"rsi":"rsi"
};



function stxTranslate(wordList){
	return function stxTranslate(english){
		var translated=wordList[english];
		if(translated) return translated;
		return english;
	};
}

/******** END DEPRECATED *******/





