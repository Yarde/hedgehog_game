export function createDashboardLayer(font, playerEnv) {

    return function drawDashboard(context) {
        const {score, time} = playerEnv.playerController;
        context.font = "48px Comic Sans MS";
        context.fillStyle = "white";
        context.fillText("SCORE", 50, 64);
        context.fillText("TIME", 1868, 64);
        context.fillText(score.toString(), 50, 128);
        context.fillText(time.toFixed().toString(), 1900, 128);
        //font.print('@x' + coins.toString().padStart(2, '0'), context, 96, LINE2);

        //font.print('WORLD', context, 152, LINE1);
        //font.print('1-1', context, 160, LINE2);

        //font.print('TIME', context, 2000, LINE1);
        //font.print(time.toFixed().toString().padStart(4, '0'), context, 1005, LINE2);
    };
}