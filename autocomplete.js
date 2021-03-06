const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
	root.innerHTML = `
		<label><b>Search</b></label>
		<input type="text" class="input">
		<div class="dropdown">
			<div class="dropdown-menu">
				<div class="dropdown-content results"></div>
			</div>
		</div>
	`;

const input = root.querySelector('input')
const dropdown = root.querySelector('.dropdown')
const resultsWraper = root.querySelector('.results')

const onInput = async event => {
	const itemArray = await fetchData(event.target.value)
	if(!itemArray.length) {
		dropdown.classList.remove('is-active')
		return
	}
	resultsWraper.innerHTML = ''
	dropdown.classList.add('is-active')

	for (let item of itemArray) {
		const option = document.createElement('a')

		option.classList.add('dropdown-item')
		option.innerHTML = renderOption(item)

		option.addEventListener('click', () => {
			dropdown.classList.remove('is-active')
			input.value = inputValue(item)
			onOptionSelect(item)
		})

		resultsWraper.appendChild(option)
	}
}


input.addEventListener('input', debounce(onInput, 500))

document.addEventListener('click', event => {
	if(!root.contains(event.target)) {
		dropdown.classList.remove('is-active')
	}
})	
}