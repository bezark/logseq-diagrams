/**
 * User model
 */
console.log("Diagrams Loaded")
function createModel () {
  return {
    openDiagram () {
      logseq.App.showMsg('hello, mind map')
      logseq.showMainUI()
    },
  }
}

function main () {
  

  // main ui
  // const root = document.querySelector('#app')
  const btnClose = document.createElement('button')
  const diagram = document.createElement('div')
  
  logseq.Editor.registerSlashCommand(
    'Diagram',
    async () => {
        logseq.showMainUI()
    }
  )
  // events
  diagram.id = 'diagram'

let uiVis = false
  document.addEventListener('keydown', function (e) {
    
    if (e.keyCode === 27) {
      console.log('esc pressed')  
       logseq.hideMainUI()

    
    }
  }, false)

 

  logseq.on('ui:visible:changed', async ({ visible }) => {
    if (!visible) {
      diagram.classList.add('hidden')
      diagram.innerHTML = ''
      return
    }

    let currentPage = await logseq.Editor.getCurrentPage()
    let currentPageContent = await logseq.Editor.getCurrentPageBlocksTree()
    
    console.log(currentPage);
    // const blocks = await logseq.Editor.getCurrentPageBlocksTree()
    initSketch(diagram, currentPage, currentPageContent)
  })

  // mount to root
  // root.append(displaySketch)
}

/**
 * @param el
 
 * @param data
 */
function initSketch (el, page, content) {


console.log('firing')
  // let mind = new MindElixir(options)
  // mind.init()
  newGraph(page, content)
  const patchRightBottomBar = () => {
    // const barWrap = document.querySelector('toolbar.rb')
    // barWrap.appendChild(btnClose)
  }

  setTimeout(() => {
    patchRightBottomBar()
    // mind.initSide()
    // el.classList.remove('hidden')
  }, 16)
}

// bootstrap
logseq.ready(createModel(), main).catch(console.error)
