var dataStr1 =
    "<instance>"+
        "<thedata id='something'>"+
            "<meta/>"+
            "<nodeA />"+
            "<nodeB>b</nodeB>"+
            "<repeatGroup template=''>"+
                "<nodeC>cdefault</nodeC>"+
            "</repeatGroup>"+
            "<repeatGroup>"+
                "<nodeC />"+
            "</repeatGroup>"+
            "<repeatGroup>"+
                "<nodeC>c2</nodeC>"+
            "</repeatGroup>"+
            "<repeatGroup>"+
                "<nodeC>c3</nodeC>"+
            "</repeatGroup>"+
            "<somenodes>"+
                "<A>one</A>"+
                "<B>one</B>"+
                "<C>one</C>"+
            "</somenodes>"+
            "<someweights>"+
                "<w1>1</w1>"+
                "<w2>3</w2>"+
                "<w.3>5</w.3>"+
            "</someweights>"+
            "<nodeF/>"+
        "</thedata>"+
    "</instance>";

var dataEditStr1 =
    "<instance>"+
        "<thedata id='something'>"+
            "<meta>"+
                '<instanceID>7c990ed9-8aab-42ba-84f5-bf23277154ad</instanceID>'+
                '<timeStart/>'+
                '<timeEnd/>'+
            "</meta>"+
            "<nodeA>2012-02-05T15:34:00.000-04</nodeA>"+
            "<nodeB>b</nodeB>"+
            "<repeatGroup template=''>"+
                "<nodeC>cdefault</nodeC>"+
            "</repeatGroup>"+
            "<repeatGroup>"+
                "<nodeC>some data</nodeC>"+
            "</repeatGroup>"+
            "<somenodes>"+
                "<A>two</A>"+
                "<B>three</B>"+
                "<C>four</C>"+
            "</somenodes>"+
            "<someweights>"+
                "<w1>1</w1>"+
                "<w2>3</w2>"+
                "<w.3>5</w.3>"+
            "</someweights>"+
        "</thedata>"+
    "</instance>";


var formStr1 =
    '<form>'+
        '<label><input name="/thedata/nodeA" type="datetime" data-type-xml="dateTime"/></label>'+
        '<label><input name="/thedata/nodeB" type="text" data-type-xml="text" /></label>'+
        '<fieldset class="jr-group" name="/thedata/repeatGroup">'+
            '<fieldset class="jr-repeat" name="/thedata/repeatGroup">'+
                '<label><input name="/thedata/repeatGroup/nodeC" type="text"/></label>'+
            '</fieldset>'+
        '</fieldset>'+
        '<label><textarea name="/thedata/nodeF" required="required"></textarea></label>'+
    '</form>';

var dataStr2 =
    '<instance xmlns="http://www.w3.org/2002/xforms">'+
        '<random id="random"><formhub><uuid/></formhub>'+
          '<random__/>'+
          '<note_random/>'+
          '<uuid__/>'+
          '<note_uuid/>'+
          '<meta>'+
            '<instanceID/>'+
            '<timeStart/>'+
            '<timeEnd/>'+
          '</meta>'+
        '</random>'+
      '</instance>';


var formStr2 =
    '<form class="jr">'+
        '<section class="form-logo"> </section>'+
        '<h2 id="form-title">Random<span></span></h2>'+
        '<div id="stats" style="display: none;">'+
            '<span id="jrSelect">0</span>'+
            '<span id="jrSelect1">0</span>'+
            '<span id="jrItem">0</span>'+
            '<span id="jrInput">0</span>'+
            '<span id="jrUpload">0</span>'+
            '<span id="jrTrigger">2</span>'+
            '<span id="jrRepeat">0</span>'+
            '<span id="jrRelevant">0</span>'+
            '<span id="jrConstraint">0</span>'+
            '<span id="jrCalculate">4</span>'+
            '<span id="jrPreload">0</span>'+
        '</div>'+
        '<label>'+
            '<input name="/random/meta/instanceID" type="hidden" data-calculate="(1+1)" />'+ /*******/
        '</label>'+
        '<fieldset class="trigger ui-state-highlight" name="/random/note_random">'+
            '<div class="question-icons"><span class="required"></span><span class="hint"></span></div>'+
            '<span lang="en" class="active">This is the random number that was generated: '+
                '<span class="jr-output" data-value="/random/random__"></span>'+
            '</span>'+
        '</fieldset>'+
        '<fieldset class="trigger ui-state-highlight" name="/random/note_uuid">'+
            '<div class="question-icons">'+
                '<span class="required"></span><span class="hint"></span>'+
            '</div>'+
            '<span lang="en" class="active">This is the uuid that was generated: '+
                '<span class="jr-output" data-value="/random/uuid__"></span>'+
            '</span>'+
        '</fieldset>'+
        '<fieldset id="jr-calculated-items" style="display:none;">'+
            '<label>'+
                '<input name="/random/formhub/uuid" type="hidden" data-calculate="uuid()" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/random/random__" type="hidden" data-calculate="random()" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/random/uuid__" type="hidden" data-calculate="uuid()" data-type-xml="string"/>'+
            '</label>'+
        '</fieldset>'+
    '</form>';

var dataStr3 =
    '<instance xmlns="http://www.w3.org/2002/xforms">'+
        '<random id="random"><formhub><uuid/></formhub>'+
          '<random__/>'+
          '<note_random/>'+
          '<uuid__/>'+
          '<note_uuid/>'+
          '<meta>'+
            '<instanceID>c13fe058-3349-4736-9645-8723d2806c8b</instanceID>'+
          '</meta>'+
        '</random>'+
      '</instance>';

var formStr3 =
    '<form class="jr">'+
        '<section class="form-logo"> </section>'+
        '<h2 id="form-title">Random<span></span></h2>'+
        '<div id="stats" style="display: none;">'+
            '<span id="jrSelect">0</span><span id="jrSelect1">0</span>'+
            '<span id="jrItem">0</span><span id="jrInput">0</span>'+
            '<span id="jrUpload">0</span><span id="jrTrigger">2</span>'+
            '<span id="jrRepeat">0</span><span id="jrRelevant">0</span>'+
            '<span id="jrConstraint">0</span><span id="jrCalculate">3</span>'+
            '<span id="jrPreload">1</span>'+
        '</div>'+
        '<fieldset id="jr-preload-items" style="display:none;">'+ /*****/
            '<label>'+
                '<input name="/random/meta/instanceID" type="hidden" data-preload="instance" data-preload-params="id" data-type-xml="string" />'+
            '</label>'+
        '</fieldset>'+                                           /*****/
        '<fieldset class="trigger ui-state-highlight" name="/random/note_random">'+
            '<div class="question-icons"><span class="required"></span><span class="hint"></span></div>'+
            '<span lang="en" class="active">This is the random number that was generated: '+
                '<span class="jr-output" data-value="/random/random__"></span>'+
            '</span>'+
        '</fieldset>'+
        '<fieldset class="trigger ui-state-highlight" name="/random/note_uuid">'+
            '<div class="question-icons">'+
                '<span class="required"></span><span class="hint"></span>'+
            '</div>'+
            '<span lang="en" class="active">This is the uuid that was generated: '+
                '<span class="jr-output" data-value="/random/uuid__"></span>'+
            '</span>'+
        '</fieldset>'+
        '<fieldset id="jr-calculated-items" style="display:none;">'+
            '<label>'+
                '<input name="/random/formhub/uuid" type="hidden" data-calculate="uuid()" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/random/random__" type="hidden" data-calculate="random()" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/random/uuid__" type="hidden" data-calculate="uuid()" data-type-xml="string"/>'+
            '</label>'+
        '</fieldset>'+
    '</form>';

var dataStr4 =
    '<nodename_bug id=\"nodename_bug\"><formhub><uuid>70bdb2dd3cf144288a6a00b36399ed79</uuid></formhub>'+
        '<hh>'+
            '<hh>hi</hh>'+
        '</hh>'+
        '<meta><instanceID></instanceID></meta>'+
    '</nodename_bug>';

var formStr4 =
    '<form class="jr" id="nodename_bug">'+
        '<section class="form-logo"> </section>'+
        '<h2 id="form-title">Node Name bug (issue 169)</h2>'+
        '<div id="stats" style="display: none;">'+
            '<span id="jrSelect">0</span><span id="jrSelect1">0</span>'+
            '<span id="jrItem">0</span><span id="jrInput">1</span>'+
            '<span id="jrUpload">0</span><span id="jrTrigger">0</span>'+
            '<span id="jrRepeat">0</span><span id="jrRelevant">0</span>'+
            '<span id="jrConstraint">0</span><span id="jrCalculate">1</span>'+
            '<span id="jrPreload">0</span>'+
        '</div>'+
        '+<fieldset class="" name="/nodename_bug/hh"><label>'+
            '<span lang="" class="">Enter text</span><input name="/nodename_bug/hh/hh" type="text" data-type-xml="string"/>'+
        '</label></fieldset>'+
        '<fieldset id="jr-calculated-items" style="display:none;"><label>'+
            '<input name="/nodename_bug/formhub/uuid" type="hidden" data-calculate="uuid()" data-type-xml="string"/>'+
        '</label></fieldset>'+
    '</form>';

var dataStr5a =
    '<widgets id="testPreloads" version="1"  >'+
        '<start_time>2012-10-30T08:44:57.000-06</start_time>'+
        '<end_time>2012-10-30T08:44:57.000-06:00</end_time>'+
        '<date_today>2012-10-30</date_today>'+
        '<deviceid>some value</deviceid>'+
        '<subscriberid>some value</subscriberid>'+
        '<my_simid>2332</my_simid>'+
        '<my_phonenumber>234234324</my_phonenumber>'+
        '<application>some context</application>'+
        '<patient>this one</patient>'+
        '<user>John Doe</user>'+
        '<uid>John Doe</uid>'+
        '<browser_name>fake</browser_name>'+
        '<browser_version>xx</browser_version>'+
        '<os_name>fake</os_name>'+
        '<os_version>xx</os_version>'+
        '<unknown>some value</unknown>'+
        '<meta>'+
            '<instanceID>uuid:56c19c6c-08e6-490f-a783-e7f3db788ba8</instanceID>'+
        '</meta>'+
    '</widgets>';

var dataStr5b =
    '<widgets id="testPreloads" version="1"  >'+
        '<start_time></start_time>'+
        '<end_time></end_time>'+
        '<date_today></date_today>'+
        '<deviceid></deviceid>'+
        '<subscriberid></subscriberid>'+
        '<my_simid></my_simid>'+
        '<my_phonenumber></my_phonenumber>'+
        '<application></application>'+
        '<patient></patient>'+
        '<user></user>'+
        '<uid></uid>'+
        '<browser_name></browser_name>'+
        '<browser_version></browser_version>'+
        '<os_name></os_name>'+
        '<os_version></os_version>'+
        '<unknown></unknown>'+
        '<meta>'+
            '<instanceID></instanceID>'+
        '</meta>'+
    '</widgets>';

var formStr5 =
    '<form class="jr" id="testPreloads">'+
        '<section class="form-logo"></section>'+
        '<h2 id="form-title">Test: Preloads JavaRosa</h2>'+
        '<div id="stats" style="display: none;">'+
            '<span id="jrSelect">0</span>'+
            '<span id="jrSelect1">0</span>'+
            '<span id="jrItem">0</span>'+
            '<span id="jrInput">0</span>'+
            '<span id="jrUpload">0</span>'+
            '<span id="jrTrigger">0</span>'+
            '<span id="jrRepeat">0</span>'+
            '<span id="jrRelevant">0</span>'+
            '<span id="jrConstraint">0</span>'+
            '<span id="jrCalculate">0</span>'+
            '<span id="jrPreload">17</span>'+
        '</div>'+
        '<fieldset id="jr-preload-items" style="display:none;">'+
            '<label>'+
                '<input name="/widgets/start_time" type="hidden" data-preload="timestamp" data-preload-params="start" data-type-xml="dateTime"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/end_time" type="hidden" data-preload="timestamp" data-preload-params="end" data-type-xml="dateTime"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/date_today" type="hidden" data-preload="date" data-preload-params="today" data-type-xml="date"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/deviceid" type="hidden" data-preload="property" data-preload-params="deviceid" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/subscriberid" type="hidden" data-preload="property" data-preload-params="subscriberid" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/my_simid" type="hidden" data-preload="property" data-preload-params="simserial" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/my_phonenumber" type="hidden" data-preload="property" data-preload-params="phonenumber" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/application" type="hidden" data-preload="context" data-preload-params="application" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/patient" type="hidden" data-preload="patient" data-preload-params="" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/user" type="hidden" data-preload="user" data-preload-params="user_id" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/uid" type="hidden" data-preload="uid" data-preload-params="" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/browser_name" type="hidden" data-preload="browser" data-preload-params="name" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/browser_version" type="hidden" data-preload="browser" data-preload-params="version" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/os_name" type="hidden" data-preload="os" data-preload-params="name" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/os_version" type="hidden" data-preload="os" data-preload-params="version" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/unknown" type="hidden" data-preload="unknown" data-preload-params="nothing" data-type-xml="string"/>'+
            '</label>'+
            '<label>'+
                '<input name="/widgets/meta/instanceID" type="hidden" data-preload="instance" data-preload-params="" data-type-xml="string"/>'+
            '</label>'+
        '</fieldset>'+
    '</form>';

var dataStr6 =
    '<data id="TestGroupBranch" version="3" xmlns="http://rapaide.com/testGroupBranch">'+
        '<nodeA/>'+
            '<group>'+
                '<nodeB/>'+
            '</group>'+
        '<nodeC/>'+
    '</data>';

var formStr6 =
    '<form class="jr" id="TestGroupBranch">'+
        '<div id="form-languages" style="display:none;" data-default-lang="">'+
            '<a href="#" lang="en">'+
                '<span>English</span>'+
            '</a>'+
        '</div>'+
        '<fieldset class="">'+
            '<label>'+
                '<span lang="en">Enter yes to reveal group</span>'+
                '<input name="/data/nodeA" type="text" data-type-xml="string"/>'+
            '</label>'+
        '</fieldset>'+
        '<fieldset class="jr-group " name="/data/group" data-relevant="/data/nodeA = &quot;yes&quot">'+
            '<h4><span lang="en">Group with relevant binding</span></h4>'+
            '<label>'+
                '<span lang="en">Enter 2 to reveal select1</span>'+
                '<input name="/data/group/nodeB" type="number" data-type-xml="int" required="required"/>'+
            '</label>'+
        '</fieldset>'+
        '<label class="jr-appearance-minimal">'+
            '<span lang="en">Select 1 option</span>'+
            '<select name="/data/nodeC" data-relevant="/data/group/nodeB = 2">'+
                '<option value="">...</option>'+
                '<option value="r">option 1</option>'+
                '<option value="g">option 2</option>'+
                '<option value="b">option 3</option>'+
            '</select>'+
        '</label>'+
    '</form>';

var dataStr7 =
    '<issue208 id="TestGroupBranch" version="3" xmlns="http://rapaide.com/testGroupBranch">'+
        '<rep>'+
            '<nodeA/>'+
            '<nodeB/>'+
        '</rep>'+
    '</issue208>';

var formStr7 =
    '<form class="jr" id="TestGroupBranch">'+
        '<div id="form-languages" style="display:none;" data-default-lang="">'+
            '<a href="#" lang="en">'+
                '<span>English</span>'+
            '</a>'+
        '</div>'+
        '<fieldset class="jr-group " name="/issue208/rep">'+
            '<fieldset class="jr-repeat " name="/issue208/rep">'+
                '<fieldset>'+
                    '<legend>'+
                        '<span lang="en">Select</span>'+
                    '</legend>'+
                    '<label>'+
                        '<span lang="en">Yes</span>'+
                        '<input autocomplete="off" name="/issue208/rep/nodeA" type="radio" value="yes" data-type-xml="select1"/>'+
                    '</label>'+
                    '<label>'+
                        '<span lang="en">No</span>'+
                        '<input autocomplete="off" name="/issue208/rep/nodeA" type="radio" value="no" data-type-xml="select1"/>'+
                    '</label>'+
                    '<label>'+
                        '<span lang="en">Dont know</span>'+
                        '<input autocomplete="off" name="/issue208/rep/nodeA" type="radio" value="dkrf" data-type-xml="select1"/>'+
                    '</label>'+
                '</fieldset>'+
                '<fieldset>'+
                    '<legend>'+
                        '<span lang="en">Select</span>'+
                    '</legend>'+
                    '<label>'+
                        '<span lang="en">Yes</span>'+
                        '<input autocomplete="off" name="/issue208/rep/nodeB" type="radio" value="yes" data-type-xml="select1" data-relevant="/issue208/rep/nodeA = &quot;yes&quot;"/>'+
                    '</label>'+
                    '<label>'+
                        '<span lang="en">No</span>'+
                        '<input autocomplete="off" name="/issue208/rep/nodeB" type="radio" value="no" data-type-xml="select1" data-relevant="/issue208/rep/nodeA = &quot;yes&quot;"/>'+
                    '</label>'+
                    '<label>'+
                        '<span lang="en">Dont know</span>'+
                        '<input autocomplete="off" name="/issue208/rep/nodeB" type="radio" value="dkrf" data-type-xml="select1" data-relevant="/issue208/rep/nodeA = &quot;yes&quot;"/>'+
                    '</label>'+
                '</fieldset>'+
            '</fieldset>'+
        '</fieldset>'+
    '</form>';

/**
 * var jrDataStrToEdit = '<?xml version="1.0" ?><Data_Types id="data_types"><formhub><uuid>98063bc21324412f9cf1cb1c2a16c66e</uuid></formhub><text/><textarea>Lots of text
with
new 
lines. Let's see if these new lines are persisten, when editing this data later.</textarea><pagebreak/><integ/><decim/><onecolor/><multicolor/><geop>39.761 -104.9284 0 22</geop><barc/><day/><now/><aud/><img/><vid/><meta><instanceID>uuid:96cc74a1-8fe9-4eeb-88fd-0371d5f76f94</instanceID></meta><meta><instanceID>uuid:c22ab3185bda403c81b8e7ed559217fa</instanceID></meta></Data_Types>';
 */