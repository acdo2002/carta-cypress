Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const testImageName = 'M17_SWex.fits'
const testRegionName = 'M17_SWex_test_world.crtf'

describe('Spectral line fitting test:', () => {
    it('Visits the carta server(demo/local)', () => {
      // cy.visit('http://carta.asiaa.sinica.edu.tw/frontend/dev/?socketUrl=wss://carta.asiaa.sinica.edu.tw/socketdev')
      cy.visit('http://localhost:3000/')
      cy.wait(500)
    })

    it(`Open folder "set_QA"`, () => {
        cy.get('[class="bp3-input"]').type('set_QA')
        // cy.get('[title="set_QA"]').click()
        cy.get(`[class="cell-text"]`).contains('set_QA').click({ force: true })
        cy.wait(500)
    })

    it(`Open image "${testImageName}"`,()=>{
        cy.get('[class="bp3-input"]').type(testImageName)
        cy.get(`[title="${testImageName}"]`).dblclick()

        // cy.get('[id="raster-canvas"]').should('have.attr', 'width')
    })

    it(`Open region "${testRegionName}"`,()=>{
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

    it(`Spectral line fitting Dialog`,()=>{
        cy.get('[id="SpectralProfilerButton"]').click()

        //select Spectral Profiler region clickbox
        cy.get('[class="bp3-button dropdown-button"]')
        .eq(1)
        .click()
        .wait(1000)
        
        //select Region 2
        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains('Region 2')
        .click()
        .wait(1000)

        //click spectral line fitting icon
        cy.get('[data-icon="regression-chart"]').click().wait(1000)

        //input the center
        cy.get('[class="bp3-input"]').eq(14).type("86.7487", { force: true })

        //input the amplitude
        cy.get('[class="bp3-input"]').eq(15).type("0.0043", { force: true })

        //input the FWHM
        cy.get('[class="bp3-input"]').eq(16).type("0.0017", { force: true })

        //click fit button
        cy.get('[class="bp3-button-text"]')
        .contains('Fit')
        .click()
    })

    it(`Match the spectral fitting result`,()=>{
      cy.get('[class="fitting-result-text"]')
        .contains('86.7486')

        cy.get('[class="fitting-result-text"]')
        .contains('0.0043')

        cy.get('[class="fitting-result-text"]')
        .contains('0.0011')
    })
})