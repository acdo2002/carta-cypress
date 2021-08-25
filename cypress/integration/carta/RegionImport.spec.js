Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const demoServer = 'http://carta.asiaa.sinica.edu.tw/frontend/dev/?socketUrl=wss://carta.asiaa.sinica.edu.tw/socketdev'
const localServer = 'http://localhost:3000/'
const testRegionName = 'M17_SWex_test_world.crtf'

describe('Generate Moment map for M17_SWex.fits:', () => {
    it('Visits the carta server(demo/local)', () => {
    //   cy.visit(demoServer)
      cy.viewport(800,600)
      cy.visit(localServer)
      cy.wait(500)
    })

    it(`Open folder "set_QA"`, () => {
      cy.get('[class="bp3-input"]').type('set_QA')
      cy.get(`[class="cell-text"]`).contains('set_QA', { timeout: 10000 }).should('be.visible').click({ force: true })
      cy.wait(500)
    })

    it(`Open image M17_SWex.fits`,()=>{
      cy.get('[class="bp3-input"]').type('M17_SWex.fits')
      cy.get(`[title="M17_SWex.fits"]`).dblclick()

    })

    it(`Import region "${testRegionName}"`,()=>{
      cy.wait(300)
      cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]').contains('File').click()
      cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]').contains('Import regions').click()
      cy.get('input:first')
        .wait(100)
        .type('set_QA_regionTest')
        
      cy.get('span')
        .contains('set_QA_regionTest')
        .click({ force: true })

      cy.get('input:first')
        .type(testRegionName)
        
      cy.get(`[class="cell-text"]`)
        .contains('M17_SWex_test_world.crtf')
        .dblclick({ force: true })
    })

    it(`snapshot`,()=>{
      cy.matchImageSnapshot('RegionImport-base');
    })

    // it(`Check imported regions shows properly`,()=>{
    //   cy.get('[id="RegionListWidgetButton"]').click()
    // })

    // it(`Export regions to "test-${testRegionName}"`,()=>{
    //     cy.wait(300)
    //     cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]').contains('File').click()
    //     cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]').contains('Export regions').click()

    //     // input the export region file name
    //     cy.get(`[placeholder="Enter file name"]`)
    //       .type('mylin-test1.crtf')

    //     // click export buttom
    //     cy.get(`[class="bp3-button-text"]`)
    //       .contains('Export Regions')
    //       .dblclick({ force: true })
    // })
})