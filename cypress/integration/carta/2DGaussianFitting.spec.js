Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const testImageName = 'Gaussian2Dimage.fits'

describe('2D image fitting test:', () => {
    it('Visits the carta server(demo/local)', () => {
      // cy.visit('http://carta.asiaa.sinica.edu.tw/frontend/dev/?socketUrl=wss://carta.asiaa.sinica.edu.tw/socketdev')
      cy.visit('http://localhost:3000/')
      cy.wait(1500)
    })

    it(`Open image "${testImageName}"`,()=>{
        cy.get('[class="bp3-input"]').type(testImageName)
        cy.get(`[title="${testImageName}"]`).dblclick()
    })

    it(`Open 2D Fitting Dialog and Input Value for fitting`,()=>{
        //Open 2D Fitting button
        cy.get('[class="custom-icon bp3-icon"]')
        .eq(11)
        .click()
        .wait(1000)

        cy.get('[placeholder="Center X"]').type('500')
        cy.get('[placeholder="Center Y"]').type('500')
        cy.get('[placeholder="Amplitude"]').type('0.05')
        cy.get('[placeholder="Major Axis"]').type('10')
        cy.get('[placeholder="Minor Axis"]').type('5')
        cy.get('[placeholder="Position Angle"]').type('0')

        cy.get('[class="bp3-button-text"]')
        .contains('Fit')
        .click()
    })

    it(`Match the 2D fitting result`,()=>{
        cy.get('[class="fitting-result-text"]',{ timeout: 30000 }).should('be.visible')
      })
})