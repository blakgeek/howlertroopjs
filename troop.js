var SoundAudioManager = (function () {

    var soundEnabled = true;

    return {
        setSoundEnabled: function (enabled) {
            soundEnabled = !!enabled;
        },

        createSound: function (url) {

            var sound = new Howl({
                src: [url],
                autoplay: false
            });

            return {
                play: function() {

                    if(soundEnabled) {
                        sound.play();
                    }
                }
            }
        }
    };
})();

var MusicAudioManager = (function () {
    var musicEnabled = true,
        activeTrack = null,
        allTracks = [];

    Howler.unload();

    return {
        setMusicEnabled: function (enabled) {
            if (enabled) {
                musicEnabled = true;
                if (activeTrack) activeTrack.fadeIn();
            } else {
                stopAllTracks();
                musicEnabled = false;
            }
        },

        createTrack: function (url, autoplay) {

            var track = new Howl({
                src: [url],
                autoplay: musicEnabled && autoplay === true,
                loop: true
            });

            allTracks.push(track);

            return {
                play: function () {
                    if (musicEnabled) {
                        track.play();
                    }
                },
                pause: function () {

                },
                fadeIn: function (a, b) {

                    if (musicEnabled) {
                        track.fade(0, 1, 500);
                    }
                },
                fadeOut: function (a, b) {
                    if (musicEnabled) {
                        track.fade(1, 0, 500);
                    }
                }
            };
        },

        playTrack: function (track) {

            if (activeTrack && activeTrack !== track) {
                activeTrack.fadeOut();
            }

            track.fadeIn();

            activeTrack = track;
        },

        pause: function () {
            stopAllTracks();
        },

        resume: function () {

            if (activeTrack) {
                activeTrack.play();
            }
        }
    };

    function stopAllTracks() {

        allTracks.forEach(function (track) {
            track.stop();
        });
    }
})();


