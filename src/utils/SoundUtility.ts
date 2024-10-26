import SoundPlayer from 'react-native-sound-player'

export const playSound = (soundName: string) => {
    try {
        const soundPath = getSoundPath(soundName)
        SoundPlayer.playAsset(soundPath)

    } catch (error) {
        console.log('Can not play the sound file', error);

    }
}

function getSoundPath(soundName: string): number {
    switch (soundName) {
        case 'dice_roll':
            return require('@/assets/sfx/dice_roll.mp3')
            break;

        case 'cheer':
            return require('@/assets/sfx/cheer.mp3')
            break;

        case 'collide':
            return require('@/assets/sfx/collide.mp3')
            break;

        case 'game_start':
            return require('@/assets/sfx/game_start.mp3')
            break;

        case 'girl1':
            return require('@/assets/sfx/girl1.mp3')
            break;

        case 'girl2':
            return require('@/assets/sfx/girl2.mp3')
            break;

        case 'girl3':
            return require('@/assets/sfx/girl3.mp3')
            break;

        case 'home':
            return require('@/assets/sfx/home.mp3')
            break;

        case 'home_win':
            return require('@/assets/sfx/home_win.mp3')
            break;

        case 'pile_move':
            return require('@/assets/sfx/pile_move.mp3')
            break;

        case 'safe_spot':
            return require('@/assets/sfx/safe_spot.mp3')
            break;

        case 'ui':
            return require('@/assets/sfx/ui.mp3')
            break;

        default:
            throw new Error(`Sound ${soundName} not found!`)
            break;
    }
}