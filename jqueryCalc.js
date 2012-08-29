(function($){
            $.widget('ui.calculator' , {
                firstValueSelected : null,
                secondValueSelected : 0,
                operatorSelected : null,
                operatorClick:false,
                result : null,
                resultField : null,

            options : {
                    theme : 'jq-calculator'

                },

         destroy : function(){
                           $('.number').unbind('click');
                           $('.operator').unbind('click');
                           $('.clear').unbind('click');
                           $('.equalTo').unbind('click');
                     }

            _create:function(){
                console.log(this.element);
                this.element.addClass('jq-calculator');
                var Opt = this.options;
                console.log(Opt.theme);
                this.element.addClass(Opt.theme);
                //creating an input field
                var textfield=$(document.createElement("input")).attr('type','text').addClass('screen');
                this.element.append(textfield);
                this.resultField=textfield;
                var numberGrp = $(document.createElement("section")).addClass('numbers');
                 this.element.append(numberGrp);
                var operatorGrp = $(document.createElement("section")).addClass('operators');
                     this.element.append(operatorGrp);
                var numButtons = ['7','8','9','4','5','6','1','2','3','0','.'];
                for(var i=0;i<numButtons.length;i++){
                    this._renderButtonElement('number',numButtons[i],numberGrp,this._handleNumberClick);
                }
                //when initializing the class we need to set event listeners on the buttons
                //get the elements by class name and add event listener
                // buttons is an array of the elements retrieved
                var opButtons = ['+','-','*','/'];
                // Handling the operator buttons
                for (var j=0;j<opButtons.length;j++){
                    this._renderButtonElement('operator',opButtons[j],operatorGrp,this._handleOperatorClick);
                }
                // Handling Equal button
                this._renderButtonElement('clear','C', operatorGrp,this._handleClearClick);
                // Handling Clear button
                this._renderButtonElement('equalTo','=',operatorGrp,this._handleEqualClick);

            },

            _renderButtonElement:function(type, value,sectionName,clickHandler){
                 var btn = $(document.createElement("Button")).attr({'class':type,'value':value}).html(value);
                 $(btn).bind( 'click', this, clickHandler ) ;
                 $(sectionName).append(btn);
             },

            _handleNumberClick : function(evt){
                var NumData = evt.data;
                var button = evt.target;
                var value = button.value;
                if(NumData.operatorClick){
                    NumData.resultField.val(value);
                    NumData.operatorClick=false;
                }else{
                    NumData.resultField.val(NumData.resultField.val()+value);
                }
            },
            _handleOperatorClick : function(evt){
                var OpData = evt.data;
                console.log(evt.data)
                if(OpData.firstValueSelected != null){
                    OpData.handleEqualClick(evt);
                    OpData.firstValueSelected = OpData.result;
                }else{
                    OpData._clearAndStoreValue(true);
                }
                //store the value and clear the text field
                var button = evt.target;
                var value = button.value;
                // Retrieving the operator from the target
                OpData.operatorSelected = value;
                OpData.operatorClick = true;
            },
            _clearAndStoreValue: function(isFirstValue){
                var value = this.resultField.val();
                console.log(value);
                // Storing the value entered before clearing the screen
                if(isFirstValue){
                    this.firstValueSelected = Number(value);
                }else{
                    this.secondValueSelected = Number(value);
                }
                this.resultField.val(null);
            },

            _setCalculatedResult : function(){
                switch(this.operatorSelected){
                //  appending the operators and the values
                case '+' :
                    this.result = this.firstValueSelected+this.secondValueSelected;
                     console.log(this.result);
                break;
                    case '-' :
                    this.result = this.firstValueSelected-this.secondValueSelected;
                break;
                    case '/' :
                    this.result = this.firstValueSelected/this.secondValueSelected;
                break;
                    case '*' :
                    this.result = this.firstValueSelected*this.secondValueSelected;
                    break;
                }
            },
            _handleEqualClick:function(evt){
                var EqData=evt.data;
                //store the value and clear the text field
                EqData._clearAndStoreValue(false);
                EqData._setCalculatedResult();
                //evaluated the values
                EqData.resultField.val(EqData.result);
                EqData.operatorClick = true;
            },
            _handleClearClick : function(evt){
                var clearData=evt.data;
                clearData.resultField.val(null);
                clearData.firstValueSelected = null;
                clearData.secondValueSelected = 0;
                clearData.operatorSelected = null;
                clearData.result = 0;
                clearData.operatorClick=false;
            },


     });
})( jQuery );