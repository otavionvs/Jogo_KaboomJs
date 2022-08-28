kaboom({
    global: true,
    fullscreen: true,
    scale: 1.6,
    debug: true,
    clearColor: [0, 0, 0, 1],
})

const MOVE_SPEED = 120
const JUMP_FORCE = 360
const BIG_JUMP_FORCE = 550
let CURRENT_JUMP_FORCE = JUMP_FORCE
const FALL_DEATH = 400
const ENEMY_SPEED = 20
let isJumping = false

loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'M6rwarW.png')
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')
loadSprite('marmor', 'EkleLlt.png')
loadSprite('down-marmor', 'Ou9w4gH.png')
loadSprite('box', 'bdrLpi6.png')
loadSprite('bomberman', 'T0xbHb8.png', {
    sliceX: 7,
    sliceY: 4,
    anims: {
        idleLeft: { from: 21, to: 21 },
        idleRight: { from: 7, to: 7 },

        moveLeft: { from: 22, to: 27 },
        moveRigth: { from: 8, to: 13 },
    }
});

loadSprite('slime', 'c1Vj0j1.png', { sliceX: 3, });
loadSprite('polvo', '6YV0Zas.png', { sliceX: 3, });
loadSprite('bomba', 'etY46bP.png', { sliceX: 3, });

loadSprite('blue-block', 'fVscIbn.png')
    // loadSprite('blue-brick', '3e5YRQd.png')
loadSprite('blue-steel', 'gqVoI2b.png')
    // loadSprite('blue-evil-shroom', 'SvV4ueD.png')
    // loadSprite('blue-surprise', 'RMqCc1G.png')

scene("game", ({ level, score, fim }) => {
    layers(['bg', 'obj', 'ui'], 'obj');

    const maps = [
        [

            '======...=============================',
            '                                      ',
            '                                      ',
            '            $  $  $  $  $  $          ',
            '==============================   =====',
            '   $                                  ',
            '                                      ',
            ' $   $        $   $   $   $     !     ',
            '     _      ?   ?   ?   ?   ?  !!!    ',
            '======   =============================',
            '                $   $   $             ',
            '                                      ',
            '       !      $   $   $   $           ',
            '      !!!         &       +           ',
            '==============================   =====',
            '                                      ',
            '                                      ',
            '                             !        ',
            '                            !!!      $',
            '======================================',
        ],
        [
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            '.                                     ',
            '.    $    $     $     $    $          ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    xxx',
            ' ) ;       ( ;   ;   ) ;    ;   (     ',
            '     )     ;    ;  ;      (        )  ',
            '   ;    );    ;   (    ;     )   ;    ',
            '  (    ;    (      ;  (   ;   ;  (    ',
            'xxxxxxxxxx       xxxxxxxxxxxxxxxxxxxxx',
            ';       ;    ;      ;        ;     ;  ',
            '    ;       ###  ;     ;        ;     ',
            '  ;      ;     ;     ;      ;         ',
            ' ;  ;  ###   ;   ###      ;        ;  ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    xxxx',
            ' ;         ;       ;    ;          ;  ',
            '     ;         ;     ;      ;   #     ',
            '         ;        ;              ;    ',
            '   ;       ;         ;    ;           ',
            '      ;         ;      >       ;      ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ]
    ]


    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('box'), solid()],
        '$': [sprite('coin'), 'coin'],
        '%': [sprite('surprise'), solid(), 'coin-surprise'],
        '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
        '}': [sprite('unboxed'), solid()],
        '@': [sprite('marmor'), solid()],
        '!': [sprite('brick'), solid()],
        '&': [sprite('slime'), 'dangerous'],
        '+': [sprite('polvo'), 'dangerous'],
        '?': [sprite('bomba'), 'bomb'],
        '>': [sprite('brick'), 'brick', solid()],
        '_': [sprite('polvo'), 'polvo'],
        ')': [sprite('brick'), 'block', solid()],
        '(': [sprite('brick'), 'block2', solid()],
        '.': [sprite('blue-steel'), 'next', solid(), scale(0.5)],
        ';': [sprite('coin'), 'coinMove', { dir: -1, timer: 0 }],
        '#': [sprite('blue-block'), solid(), scale(0.5), 'wall'],
        'x': [sprite('blue-steel'), solid(), scale(0.5), 'wall'],

    }

    const gameLevel = addLevel(maps[level], levelCfg)

    const scoreLabel = add([
        text(score),
        pos(25, 6),
        layer('ui'),
        {
            value: score,
        }
    ])

    add([text('level ' + parseInt(level + 1)), pos(40, 6)])



    // let fim = 30;
    function repeat() {
        if (fim < 0) return
        var meuInterval = setInterval(() => {
            fim--;
            time.value--;
            time.text = time.value
            if (fim <= 0) {
                clearInterval(meuInterval);
            }
        }, 1000);

    };

    repeat();

    const time = add([
        text(fim), pos(200, 6), layer('ui'),
        {
            value: fim
        }
    ])




    // const player = add([
    //     sprite('bomberman'), ,
    //     pos(30, 320),
    //     body(),
    //     origin('bot')


    // ])

    const player = add([
        sprite('bomberman', {
            animeSpeed: 0.1,
            frame: 14,
        }),
        pos(30, 320),
        { dir: vec2(1, 0) },
        body(),

    ])


    let mov = 0;

    keyDown('left', () => {
        player.move(-MOVE_SPEED, 0);
        player.dir = vec2(-1, 0);
        mov = 1
    })

    keyDown('right', () => {
        player.move(MOVE_SPEED, 0);
        player.dir = vec2(1, 0);
        mov = 2
    })

    keyPress('left', () => {
        player.play('moveLeft')
    })

    keyPress('right', () => {
        player.play('moveRigth')
    })

    keyRelease('left', () => {
        player.play('idleLeft')
    })

    keyRelease('right', () => {
        player.play('idleRight')
    })

    keyPress('up', () => {
        if (player.grounded()) {
            isJumping = true
            player.jump(CURRENT_JUMP_FORCE)
        }
    })

    let contador = 0;
    let movimento = -20;
    let contador1 = 0;
    let movimento1 = -20;
    let contador2 = 0;
    let movimento2 = -20;
    let contador3 = 0;
    let movimento3 = -20;
    let contador4 = 0;
    let movimento4 = -20;

    action('dangerous', (obj) => {
        obj.move(movimento, 0)
        contador++;
        if (contador == 450) {
            movimento = 20;
        } else if (contador == 900) {
            movimento = -20;
            contador = 0;
        }
    })

    action('bomb', (obj) => {
        obj.move(movimento1, 0)
        contador1++;
        if (contador1 == 250) {
            movimento1 = 20;
        } else if (contador1 == 500) {
            movimento1 = -20;
            contador1 = 0;
        }
    })

    action('polvo', (obj) => {
        obj.move(movimento2, 0)
        contador2++;
        if (contador2 == 250) {
            movimento2 = 20;
        } else if (contador2 == 500) {
            movimento2 = -20;
            contador2 = 0;
        }
    })

    action('block', (obj) => {
        obj.move(movimento3, 0)
        contador3++;
        if (contador3 == 1100) {
            movimento3 = 20;
        } else if (contador3 == 2200) {
            movimento3 = -20;
            contador3 = 0;
        }
    })
    action('block2', (obj) => {
        obj.move(movimento4, 0)
        contador4++;
        if (contador4 == 1000) {
            movimento4 = 20;
        } else if (contador4 == 2000) {
            movimento4 = -20;
            contador4 = 0;
        }
    })

    player.collides('dangerous', (obj) => {
        // go("game", { level: 0, score: 0});
    })

    player.collides('bomb', (obj) => {
        // go("game", { level: 0, score: 0});
    })

    player.collides('next', (obj) => {
        // let listaScore = [];
        // listaScore = JSON.parse(localStorage.getItem('listaScoreTotal'));
        // listaScore.push(scoreLabel.value);
        // localStorage.listaScoreTotal = JSON.stringify(listaScore);
        localStorage.setItem("score", scoreLabel.value);
        // repeat();
        // go('game', {
        //   level: (level + 1) % maps.length,
        //   score: scoreLabel.value, 
        //   fim: 30
        // })
        window.location.href = "modal.html"
    })

    player.collides('coin', (obj) => {
        destroy(obj)
        scoreLabel.value++
            scoreLabel.text = scoreLabel.value

    })
    player.collides('coinMove', (obj) => {
        destroy(obj)
        scoreLabel.value++
            scoreLabel.text = scoreLabel.value

    })

    action('coinMove', (s) => {
        // s.pushOutAll();
        s.move(0, s.dir * ENEMY_SPEED)
        s.timer -= dt()
        if (s.timer <= 0) {
            s.dir = -s.dir
            s.timer = rand(5)
        }
    })

    collides('coinMove', 'wall', (s) => {
            s.dir = -s.dir;
        })
        // player.collides('coinMove', (s) => {
        //   s.dir = -s.dir;
        // })

    player.collides('brick', (obj) => {
        if (isJumping) {
            isJumping = false;
            player.move(-10, 0);
        } else if (mov == 2) {
            obj.move(50, 0)
        } else if (mov == 1) {
            obj.move(-50, 0)
        }
    })
})

start("game", { level: 0, score: 0, fim: 1 })