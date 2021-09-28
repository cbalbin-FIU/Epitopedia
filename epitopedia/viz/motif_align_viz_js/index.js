// feed from json. make json request from data in meta tag in html


var schemeIdQuery = NGL.ColormakerRegistry.addSelectionScheme([
    ["red", "22-26:A"],
    ["#cc955d", "*"]
], "motif");


var schemeIdMimic = NGL.ColormakerRegistry.addSelectionScheme([
    ["red", "110-114:X"],
    ["#7899d2", "*"]
], "motif");

var schemeIdAln = NGL.ColormakerRegistry.addSelectionScheme([
    ["#cc955d", ":A"],
    ["#7899d2", ":B"]
], "motif");



document.addEventListener("DOMContentLoaded", function () {



    var stage1 = new NGL.Stage("viewport1", { backgroundColor: "black" });
    stage1.loadFile("6XR8.cif").then(function (o) {
        o.addRepresentation("cartoon", { color: schemeIdQuery });
        o.addRepresentation("ball+stick", { sele: "22-26:A", color: schemeIdQuery });
        o.autoView("22-26:A");
        //o.autoView("22-26:A");

    })
    // stage1.loadFile("6XR8.cif",).then(function (o) {
    //     o.addRepresentation("cartoon", { color: schemeId });
    //     o.addRepresentation("surface", { sele: "22-26", opacity: 0.6, color: schemeId }); // pass schemeId here

    //     var ap = o.structure.getAtomProxy()
    //     var shape = new NGL.Shape("shape");
    //     ap.residueIndex = 22 + Math.floor((26 - 22) / 2);



    //     shape.addArrow([ap.positionToVector3()["x"], ap.positionToVector3()["y"], ap.positionToVector3()["z"]], [ap.positionToVector3()["x"], ap.positionToVector3()["y"], ap.positionToVector3()["z"] + 5], [1, 0, 1], 1.0)
    //     var shapeComp = stage1.addComponentFromObject(shape);
    //     console.log(stage1)
    //     shapeComp.addRepresentation("buffer");

    //     o.autoView();

    // });


    var stage2 = new NGL.Stage("viewport2", { backgroundColor: "black" });
    stage2.loadFile("1v7m.cif",).then(function (o) {
        o.addRepresentation("cartoon", { color: schemeIdMimic });  // pass schemeId here
        o.addRepresentation("ball+stick", { sele: "110-114:X", color: schemeIdMimic });
        o.autoView("110-114:X");
    });


    // var stage3 = new NGL.Stage("viewport3", { backgroundColor: "white" });
    // stage3.loadFile("6XR8.cif",).then(function (o) {
    //     o.addRepresentation("validation", { color: schemeIdQuery });  // pass schemeId here
    //     o.autoView();
    // });


    var stage4 = new NGL.Stage("viewport3", { backgroundColor: "black" });
    stage4.loadFile("6xr8_A_22-26___1v7m_X_110-114_all_atm.pdb",).then(function (o) {
        o.addRepresentation("ball+stick", { color: schemeIdAln });  // pass schemeId here
        o.autoView();
    });


    window.addEventListener("resize", function (event) {
        stage1.handleResize();
        stage2.handleResize();
        // stage3.handleResize();
        stage4.handleResize();
    }, false);


    var elms = document.getElementsByClassName('residue');
    for (const elm of elms) {
        elm.addEventListener("mouseenter", function (event) {

            // highlight the mouseleave target
            event.target.getElementsByTagName("rect")[0].style.fill = "green";

            for (const repr of stage1.compList[0].reprList) {
                repr.setColor(NGL.ColormakerRegistry.addSelectionScheme([
                    ["green", event.target.dataset.resnumQuery + ":" + event.target.dataset.chainQuery],
                    ["red", "22-26:A"],

                    ["#cc955d", "*"]
                ], "highlight"));
                repr.update({ color: true });
            };

            for (const repr of stage2.compList[0].reprList) {
                repr.setColor(NGL.ColormakerRegistry.addSelectionScheme([
                    ["green", event.target.dataset.resnumMimic + ":" + event.target.dataset.chainMimic],
                    ["red", "110-114:X"],

                    ["#7899d2", "*"]
                ], "highlight"));
                repr.update({ color: true });
            };


            for (const comp of stage4.compList) {
                comp.reprList[0].setColor(NGL.ColormakerRegistry.addSelectionScheme([
                    ["green", event.target.dataset.resnumQuery + ":A"],
                    ["green", event.target.dataset.resnumMimic + ":B"],
                    ["#cc955d", ":A"],
                    ["#7899d2", ":B"]
                ], "highlight"));
                comp.reprList[0].update({ color: true });
            };


            // reset the color after a short delay



            console.log(elm.dataset);

        }, false);


        elm.addEventListener("mouseleave", function (event) {
            // highlight the mouseleave target
            event.target.getElementsByTagName("rect")[0].style.fill = "blue";

            // reset the color after a short delay
            for (const repr of stage1.compList[0].reprList) {
                repr.setColor(NGL.ColormakerRegistry.addSelectionScheme([
                    ["red", event.target.dataset.resnumQuery + ":" + event.target.dataset.chainQuery],
                    ["red", "22-26:A"],

                    ["#cc955d", "*"]

                ], "highlight"));
                repr.update({ color: true });
            };


            for (const repr of stage2.compList[0].reprList) {
                repr.setColor(NGL.ColormakerRegistry.addSelectionScheme([
                    ["red", event.target.dataset.resnumMimic + ":" + event.target.dataset.chainMimic],
                    ["red", "110-114:X"],

                    ["#7899d2", "*"]
                ], "highlight"));
                repr.update({ color: true });
            };


            for (const repr of stage4.compList[0].reprList) {
                repr.setColor(NGL.ColormakerRegistry.addSelectionScheme([
                    ["#cc955d", ":A"],
                    ["#7899d2", ":B"]
                ], "highlight"));
                repr.update({ color: true });
            };



            console.log(elm.dataset);

        }, false);

    };
});