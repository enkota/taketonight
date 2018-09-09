$(function() {
  var tracks = [];
  $('.ab-player').each(function(index, player) {
    var track = {};
    var fileFormats = $(player).data('formats').replace(' ', '').split(',');
    var $that = $(this);

    var trackWithFormats = [];
    $(fileFormats).each(function(indes, format) {
      trackWithFormats.push($(player).data('track-a').concat('.', format));
    });
    track.a = new Howl({
      urls: trackWithFormats,
      onend: function() {
        track.a.mute();
        track.b.mute();
        track.audible = 'none';
        $that.removeClass('active');
        $that.find('.ab-player-button-a').removeClass('active');
      }
    });

    trackWithFormats = [];
    $(fileFormats).each(function(indes, format) {
      trackWithFormats.push($(player).data('track-b').concat('.', format));
    });
    track.b = new Howl({
      urls: trackWithFormats,
      onend: function() {
        $that.find('.ab-player-button-a').removeClass('active');
      }
    });

    track.a.mute();
    track.b.mute();
    track.audible = 'none';

    $(this).find('.ab-player-button-a').click(function(){
      switch(track.audible) {
        case 'none':
          track.a.play();
          track.b.play();
          track.a.unmute();
          track.b.mute();
          track.audible = 'a';
          $that.addClass('active');
          $(this).addClass('active');
          break;
        case 'a':
          track.a.pause();
          track.b.pause();
          track.a.mute();
          track.b.mute();
          track.audible = 'none';
          $that.removeClass('active');
          $(this).removeClass('active');
          break;
        case 'b':
          track.a.unmute();
          track.b.mute();
          track.audible = 'a';
          $that.addClass('active');
          $that.find('.ab-player-button-b').removeClass('active');
          $(this).addClass('active');
          break;
      }
    });

    $(this).find('.ab-player-button-b').click(function(){
      switch(track.audible) {
        case 'none':
          track.a.play();
          track.b.play();
          track.a.mute();
          track.b.unmute();
          track.audible = 'b';
          $that.addClass('active');
          $(this).addClass('active');
          break;
        case 'b':
          track.a.pause();
          track.b.pause();
          track.a.mute();
          track.b.mute();
          track.audible = 'none';
          $that.removeClass('active');
          $(this).removeClass('active');
          break;
        case 'a':
          track.b.unmute();
          track.a.mute();
          track.audible = 'b';
          $that.addClass('active');
          $that.find('.ab-player-button-a').removeClass('active');
          $(this).addClass('active');
          break;
      }
    });

    tracks.push(track);

    $that.addClass('loading');
    track.a.loaded = false;
    track.b.loaded = false;

    $.get(track.a._src, function() {
      track.a.loaded = true;
      if(track.b.loaded)
        $that.removeClass('loading');
    });

    $.get(track.b._src, function() {
      track.b.loaded = true;
      if(track.a.loaded)
        $that.removeClass('loading');
    });

  });
});
