const text = document.getElementById( 'notify-text' );
const game = document.getElementById( 'bullet-game' );
const reset = document.getElementById( 'notify-reset' );



reset.addEventListener( 'click', () => {
	chrome.storage.local.clear();
	text.value = '';
} );

game.addEventListener( 'click', () => {
	chrome.runtime.sendMessage( '', {
		type: 'notification',
		message: text.value
	});
} );