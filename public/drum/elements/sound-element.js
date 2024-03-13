import {partyElements, PartyElement} from "./party-elements.js"
import Sound from "../sound.js"

export default class DelugeSound extends PartyElement {
	constructor() {
		super()
		this.$("#audition").addEventListener("click", () => {
			this.announce("audition")
			this.sound.audition()
		})
		this.$("#browse").addEventListener("click", async () => {
			let [sound] = await Sound.browse({
				multiple: false
			})
			this.sound.replace(sound)
		})

		this.$("#up").addEventListener("click", () =>
			this.announce("move-up", this.sound.index)
		)
		this.$("#down").addEventListener("click", () =>
			this.announce("move-down", this.sound.index)
		)
		this.$("#name").addEventListener(
			"input",
			event => (this.sound.name = event.target.value)
		)
		this.$("#kill").addEventListener("click", event => {
			this.sound.stop()
			this.announce("kill", this.sound.index)
		})
		this.$("#loop-mode").addEventListener("change", event => {
			this.sound.loopMode = event.target.value
		})
		this.$("#choke").addEventListener("change", event => {
			this.sound.choke = event.target.checked
		})
		this.$("#reversed").addEventListener("change", event => {
			this.sound.reversed = event.target.checked
		})
		this.$("#sidechain-send").addEventListener("change", event => {
			this.sound.sidechainSend = event.target.checked
		})
		this.$("#linear-interpolation").addEventListener("change", event => {
			this.sound.linearInterpolation = event.target.checked
		})
		this.$("#time-stretch").addEventListener("change", event => {
			this.sound.timeStretch = event.target.checked
		})
	}

	/** @type {Sound} */
	get sound() {
		return this.get("sound")
	}

	set sound(sound) {
		this.set("sound", sound, () => {
			this.$("#name").value = sound.name
			this.$("#audition").style.background = sound.color
			this.style.border = `1px solid ${sound.color}`
			this.$("#loop-mode").value = sound.loopMode
			this.$("#choke").checked = sound.choke
			this.$("#reversed").checked = sound.reversed
			this.$("#sidechain-send").checked = sound.sidechainSend
			this.$("#linear-interpolation").checked = sound.linearInterpolation
			this.$("#time-stretch").checked = sound.timeStretch
			this.$("#slot").textContent = sound.index.toString().padStart(3, "0")
		})
	}
}
partyElements.define("deluge-sound", DelugeSound)
