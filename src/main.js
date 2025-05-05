import loadContent from './load-content.effect'
import setLanguage from './set-locale-from-html-lang.effect'
import './hr-app'

function main() {
  try {
    loadContent()
    setLanguage()
  } catch (err) {
    console.error(err)
    alert('Failed to initialize. Please try later.')
  }
}

main()
