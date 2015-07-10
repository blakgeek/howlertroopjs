var SoundAudioManager = (function() {

	var soundEnabled = true;

	return {
		setSoundEnabled: function(enabled) {
			soundEnabled = !!enabled;
		},

		createSound: function(name) {

			var sound = new Howl({
				urls: ['audio/' + name + '.mp3'],
				autoplay: false
			});

			sound.play = function() {
				if(soundEnabled) {
					Howl.prototype.play.apply(sound, arguments);
				}

				return sound;
			};

			return sound;
		}
	};
})();

var MusicAudioManager = (function() {
	var musicEnabled = true,
		activeTrack = null,
		allTracks = [];

	return {
		setMusicEnabled: function(enabled) {
			if(!!enabled) {
				musicEnabled = true;
				if(activeTrack) activeTrack.fadeIn(1, .5);
			} else {
				if(activeTrack) activeTrack.fadeOut(0, .5);
				musicEnabled = false;
			}
		},

		createTrack: function(name, autoplay) {

			var track = new Howl({
				urls: ['audio/' + name + '.mp3'],
				autoplay: musicEnabled && autoplay === true,
				loop: true,
				volume: .5
			});

			track.play = function() {
				if(musicEnabled) {
					Howl.prototype.play.apply(track, arguments);
				}

				return track;
			};

			track.fadeIn = function() {
				if(musicEnabled) {
					Howl.prototype.fadeIn.apply(track, arguments);
				}
				return track;
			};

			track.fadeOut = function() {
				if(musicEnabled) {
					Howl.prototype.fadeOut.apply(track, arguments);
				}

				return track;
			};

			allTracks.push(track);
			return track;
		},

		playTrack: function(track) {

			if(activeTrack && activeTrack !== track) {
				activeTrack.fadeOut(0, .5);
			}

			track.fadeIn(1, .5);

			activeTrack = track;
		}
	}
})();


