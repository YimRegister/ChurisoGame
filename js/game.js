

/*things I need:
Possible choices
Combinations for each trial
Move from trial to trial
Feedback for correct answer


*/


//set up the stage
var canvas = document.getElementById("canvas");
var stage = new createjs.Stage(canvas);
stage.enableMouseOver();


// setting mouseChildren to false will cause events to be dispatched directly from the button instead of its children.
// button.mouseChildren = false;



var game = function(){
        var next = function(){
                stage.removeAllChildren();
stage.update();
        //welcome
                var text = new createjs.Text("Welcome to the", "bold 48px Arial", "white");
                text.x=300;
                text.y=10;
                text.shadow = new createjs.Shadow("#000", 4, 4, 8);
                stage.addChild(text);
                var text2 = new createjs.Text("Concept Factory", "bold 70px Arial", "white");
                text2.shadow = new createjs.Shadow("#000", 4, 4, 8);
                stage.addChild(text2);
                text2.x=225;
                text2.y=80;
                stage.update();

                //here is the "apply box"
                var box = new createjs.Bitmap("images/metalbox.jpg");
                box.scaleX = .50;
                box.scaleY = .50;
                box.x = 400;
                box.y = 260;
                stage.addChild(box);
                var gear = new createjs.Bitmap("images/gear.png");
                gear.scaleX = .3;
                gear.scaleY = .3;
                gear.x=440;
                gear.y = 290;
                gear.regX=150;
                gear.regY = 150;
                
                stage.addChild(gear);
                var gear2 = new createjs.Bitmap("images/gear.png");
                gear2.scaleX = .2;
                gear2.scaleY = .2;
                gear2.x=440;
                gear2.y = 350;
                gear2.regX=150;
                gear2.regY = 150;
                stage.addChild(gear2);
                var gear3 = new createjs.Bitmap("images/gear.png");
                gear3.scaleX = .3;
                gear3.scaleY = .3;
                gear3.x=575;
                gear3.y = 420;
                gear3.regX=150;
                gear3.regY = 150;
                
                stage.addChild(gear3);
              

                //left robot arm
                var left = new createjs.Bitmap("images/left.png");
                left.scaleX = .50;
                left.scaleY = .50;
                left.x = 0;
                left.y = 260;
                stage.addChild(left);

                //right robot arm
                var right = new createjs.Bitmap("images/right.png");
                right.scaleX = .50;
                right.scaleY = .50;
                right.x = 680;
                right.y = 260;
                stage.addChild(right);

                //tile holder
                var holder = new createjs.Bitmap("images/holder2.jpg");
                holder.y=550;
                holder.x=225;
                stage.addChild(holder);

                //all the tiles
                var t1 = new createjs.Bitmap("images/s1.jpg");
                t1.y=600;
                t1.x=260;
                var t2 = new createjs.Bitmap("images/s2.jpg");
                t2.y=600;
                t2.x=350;
                var t3 = new createjs.Bitmap("images/s3.jpg");
                t3.y=600;
                t3.x=440;
                var t4 = new createjs.Bitmap("images/s7.jpg");
                t4.y=600;
                t4.x=530;
                var t5 = new createjs.Bitmap("images/s8.jpg");
                t5.y=600;
                t5.x=620;
                var t6 = new createjs.Bitmap("images/s10.jpg");
                t6.y=600;
                t6.x=710;

                var background = new createjs.Shape();
			                background.name = "background";
			                background.graphics.beginFill("gray").drawRoundRect(0, 0, 150, 60, 10);
			
                var label = new createjs.Text("Next", "bold 24px Arial", "#FFFFFF");
                label.name = "label";
                label.textAlign = "center";
                label.textBaseline = "middle";
                label.x = 150/2;
                label.y = 60/2;

                var button = new createjs.Container();
                button.name = "button";
                button.x = 450;
                button.y = 735;
                button.addChild(background, label);
                button.on("click", handleClick);
                
                stage.addChild(button);
                 
        //possible choices
                var choices = [t1,t2,t3,t4,t5,t6]
                for(var t=0; t< choices.length;t++) {
                        stage.addChild(choices[t]);
                        choices[t].shadow = new createjs.Shadow("#808080", 3, 3, 0);
                        /*choices[t].on("pressmove", function(evt) {
                                evt.target.x = evt.stageX;
                                evt.target.y = evt.stageY;
                        });
                        choices[t].on("pressup", function(evt) { console.log("up"); })*/
                        choices[t].on("mouseover", function(evt){this.shadow = new createjs.Shadow("#49e17a", 3, 3, 25);});
                        choices[t].on("mouseout", function(evt){this.shadow = new createjs.Shadow("#808080", 3, 3, 0);});

                }


                var bouncetile = function(t){
                        createjs.Tween.get(t)
                        .to({y:560},400)
                        .wait(500)
                        .to({y:600},400)

                }

                //our arguments!
                f1 = new createjs.Bitmap("images/s1.jpg");
                f2 = new createjs.Bitmap("images/s2.jpg");
                f3 = new createjs.Bitmap("images/s3.jpg");
                f4 = new createjs.Bitmap("images/s7.jpg");
                args1 = [f1,f2,f3,f4];
                for(var f=0; f< args1.length;f++){
                        args1[f].x=355;
                        args1[f].y=335;
                }
                a1 = new createjs.Bitmap("images/s1.jpg");
                a2 = new createjs.Bitmap("images/s2.jpg");
                a3 = new createjs.Bitmap("images/s3.jpg");
                a4 = new createjs.Bitmap("images/s7.jpg");
                args2 = [a1,a2,a3,a4];
                for(var f=0; f< args2.length;f++){
                        args2[f].x=655;
                        args2[f].y=335;
                }


                //moving the arms, with their arguments
                var movearms =function(arg1,arg2,correct){
                       arg1.regX = 40;
                       arg1.regY = 35;
                       arg2.regX=40;
                       arg2.regY=35;
                        stage.addChild(arg1);
                        stage.addChild(arg2);
                        
                        createjs.Tween.get(left, {loop:false})
                                .to({ x: 115 }, 1200, createjs.Ease.none)
                                .to({ x: 0 }, 1200, createjs.Ease.none)
                        createjs.Tween.get(arg1, {loop:false})
                                .to({ x: 445 }, 1200, createjs.Ease.none)
                                .to({rotation: 360},500)
                                .to({ alpha: .6, x:515 }, 500, createjs.Ease.getPowInOut(2))


                        createjs.Tween.get(right, {loop:false})
                                .to({ x: 570 }, 1200, createjs.Ease.none)
                                .to({ x: 680 }, 1200, createjs.Ease.none)
                        createjs.Tween.get(arg2, {loop:false})
                                .to({ x: 550 }, 1200, createjs.Ease.none)
                                .to({rotation: -360},500)
                                .to({ alpha: .6, x:515 }, 500, createjs.Ease.getPowInOut(2))
                        arg1.shadow = new createjs.Shadow("yellow", 3, 3, 25)
                        arg2.shadow = new createjs.Shadow("yellow", 3, 3, 25)
                        createjs.Tween.get(gear, {loop:false})
                                .wait(900)
                                .to({rotation: 360},2000)
                        createjs.Tween.get(gear2, {loop:false})
                                .wait(900)
                                .to({rotation: 360},2000)
                        createjs.Tween.get(gear3, {loop:false})
                                .wait(900)
                                .to({rotation: 360},2000)     
                                

                                stage.removeChild(correct);
                                stage.addChild(correct);
                                createjs.Tween.get(correct, {loop:false})


                                        .wait(2500)
                                        .call(turngreen)
                                        .to({scaleX: 1.2, scaleY: 1.2})
                                        .to({ alpha: .6, x:470, y:290 }, 500, createjs.Ease.getPowInOut(2))
                                        .to({ alpha: 1, x:470, y:290 }, 500, createjs.Ease.getPowInOut(2))
                                        .to({x:470,y:290})
                                        
                                        
                                        //.to({y:560},400)
                                        .wait(500)
                                        .to({y:280},400)
                                        .to({scaleX: 1, scaleY: 1})
                                        .to({scaleX: 1.2, scaleY: 1.2})
                                        .to({y:290},400)
                                        .wait(500)
                                        .to({y:280},400)
                                        .to({scaleX: 1, scaleY: 1})
                                        .to({scaleX: 1.2, scaleY: 1.2})
                                        .to({y:290},400)
                                        .wait(500)
                                        .to({y:280},400)
                                        .to({scaleX: 1, scaleY: 1})
                                        .to({scaleX: 1.2, scaleY: 1.2})
                                        .to({y:290},400)
                                        
                                        
                                        

                                        .call(turnback)
                                        .call(lightbutton)


                        function turngreen() {
                                correct.shadow=new createjs.Shadow("yellow", 3, 3, 25);
                        }
                        function turnback() {
                                correct.shadow=new createjs.Shadow("#808080", 3, 3, 0);
                        }
                        function lightbutton(){
                                 background.graphics.beginFill("#1a8cff").drawRoundRect(0, 0, 150, 60, 10);
                        }




                };
                        
                       



                        //choose random arguments, place them in "apply" box
                        movearms(args1[Math.floor(Math.random() * args1.length)],args2[Math.floor(Math.random() * args2.length)],t2);




               

        }
        next();
        function handleClick(evt){
                setTimeout(next,1000);
                
        }
        
      
        
}
game();




//reload frames
createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", stage);
