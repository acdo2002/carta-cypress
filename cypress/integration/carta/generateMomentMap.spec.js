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
        // cy.get('[title="set_QA"]').click()
        cy.get(`[class="cell-text"]`).contains('set_QA', { timeout: 10000 }).should('be.visible').click({ force: true })
        cy.wait(500)
    })

    it(`Open image M17_SWex.fits`,()=>{
        cy.get('[class="bp3-input"]').type('M17_SWex.fits')
        cy.get(`[title="M17_SWex.fits"]`).dblclick()

        // cy.get('[id="raster-canvas"]').should('have.attr', 'width')
    })

    it(`Moment generator Dialog`,()=>{
        cy.wait(5000)
        cy.get('[id="SpectralProfilerButton"]').click()

        //Open Moment generator dialog
        cy.get('[d="M 0.81609227,1.2562455 V 14.58427 H 3.5600972 V 5.2322526 h 0.037333 L 6.8641032,14.58427 H 9.1227739 L 12.389446,5.1389191 h 0.03733 V 14.58427 h 2.744005 V 1.2562455 H 11.045444 L 8.0961054,10.421595 H 8.058772 L 4.941433,1.2562455 Z"]').click({ force: true })

        //set Image
        cy.get('select').eq(9).select("0: M17_SWex.fits")

        //set Region: Image
        cy.get('select').eq(10).select("Image")

        //set Coordinate: Channel
        cy.get('select').eq(11).select("Channel")

        //set Range
        cy.get('[class="bp3-input"]').eq(9).clear()
        cy.get('[class="bp3-input"]').eq(10).clear().type("24")

        //click moment
        cy.get('[class="bp3-input-ghost bp3-multi-select-tag-input-input"]').click()

        //select moment number would like to generate
        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("-1: Mean value of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("1: Intensity weighted coordinate")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("2: Intensity weighted dispersion of the coordinate")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("3: Median value of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("4: Median coordinate")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("5: Standard deviation about the mean of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("6: Root mean square of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("7: Absolute mean deviation of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("8: Maximum value of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("9: Coordinate of the maximum value of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("10: Minimum value of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("11: Coordinate of the minimum value of the spectrum")
        .click()

        //click Generate
        cy.get('[class="bp3-button-text"]').contains("Generate").click()
        cy.wait(10000)
    })

    it(`Check the generated moment maps in Image List`,()=>{
        cy.get('[class="name-cell"]').eq(1)
        .contains('M17_SWex.fits.moment.integrated')

        cy.get('[class="name-cell"]').eq(2)
        .contains('M17_SWex.fits.moment.average')

        cy.get('[class="name-cell"]').eq(3)
        .contains('M17_SWex.fits.moment.weighted_coord')

        cy.get('[class="name-cell"]').eq(4)
        .contains('M17_SWex.fits.moment.weighted_dispersion_coord')

        cy.get('[class="name-cell"]').eq(5)
        .contains('M17_SWex.fits.moment.median')

        cy.get('[class="name-cell"]').eq(6)
        .contains('M17_SWex.fits.moment.standard_deviation')

        cy.get('[class="name-cell"]').eq(7)
        .contains('M17_SWex.fits.moment.rms')

        cy.get('[class="name-cell"]').eq(8)
        .contains('M17_SWex.fits.moment.abs_mean_dev')

        cy.get('[class="name-cell"]').eq(9)
        .contains('M17_SWex.fits.moment.maximum')

        cy.get('[class="name-cell"]').eq(10)
        .contains('M17_SWex.fits.moment.maximum_coord')

        //cy.get('[class="name-cell"]') only get 10 items

        cy.get('[class="bp3-table-quadrant-scroll-container"]').eq(0)
        .scrollTo('bottom')

        cy.wait(500)

        cy.get('[class="name-cell"]')
        .contains('M17_SWex.fits.moment.minimum')

        cy.get('[class="name-cell"]')
        .contains('M17_SWex.fits.moment.minimum_coord')
    })

})

describe('Generate Moment map for M17_SWex.image:', () => {
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

    it(`Open image M17_SWex.image`,()=>{
        cy.get('[class="bp3-input"]').type('M17_SWex.image')
        cy.get(`[title="M17_SWex.image"]`).dblclick()
    })

    it(`Moment generator Dialog`,()=>{
        cy.wait(5000)
        cy.get('[id="SpectralProfilerButton"]').click()

        //Open Moment generator dialog
        cy.get('[d="M 0.81609227,1.2562455 V 14.58427 H 3.5600972 V 5.2322526 h 0.037333 L 6.8641032,14.58427 H 9.1227739 L 12.389446,5.1389191 h 0.03733 V 14.58427 h 2.744005 V 1.2562455 H 11.045444 L 8.0961054,10.421595 H 8.058772 L 4.941433,1.2562455 Z"]').click({ force: true })

        //set Image
        cy.get('select').eq(9).select("0: M17_SWex.image")

        //set Region: Image
        cy.get('select').eq(10).select("Image")

        //set Coordinate: Channel
        cy.get('select').eq(11).select("Channel")

        //set Range
        cy.get('[class="bp3-input"]').eq(9).clear()
        cy.get('[class="bp3-input"]').eq(10).clear().type("24")

        //click moment
        cy.get('[class="bp3-input-ghost bp3-multi-select-tag-input-input"]').click()

        //select moment number would like to generate
        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("-1: Mean value of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("1: Intensity weighted coordinate")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("2: Intensity weighted dispersion of the coordinate")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("3: Median value of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("4: Median coordinate")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("5: Standard deviation about the mean of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("6: Root mean square of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("7: Absolute mean deviation of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("8: Maximum value of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("9: Coordinate of the maximum value of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("10: Minimum value of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("11: Coordinate of the minimum value of the spectrum")
        .click()

        //click Generate
        cy.get('[class="bp3-button-text"]').contains("Generate").click()
        cy.wait(10000)
    })

    it(`Check the generated moment maps in Image List`,()=>{
        cy.get('[class="name-cell"]').eq(1)
        .contains('M17_SWex.image.moment.integrated')

        cy.get('[class="name-cell"]').eq(2)
        .contains('M17_SWex.image.moment.average')

        cy.get('[class="name-cell"]').eq(3)
        .contains('M17_SWex.image.moment.weighted_coord')

        cy.get('[class="name-cell"]').eq(4)
        .contains('M17_SWex.image.moment.weighted_dispersion_coord')

        cy.get('[class="name-cell"]').eq(5)
        .contains('M17_SWex.image.moment.median')

        cy.get('[class="name-cell"]').eq(6)
        .contains('M17_SWex.image.moment.standard_deviation')

        cy.get('[class="name-cell"]').eq(7)
        .contains('M17_SWex.image.moment.rms')

        cy.get('[class="name-cell"]').eq(8)
        .contains('M17_SWex.image.moment.abs_mean_dev')

        cy.get('[class="name-cell"]').eq(9)
        .contains('M17_SWex.image.moment.maximum')

        cy.get('[class="name-cell"]').eq(10)
        .contains('M17_SWex.image.moment.maximum_coord')

        //cy.get('[class="name-cell"]') only get 10 items

        cy.get('[class="bp3-table-quadrant-scroll-container"]').eq(0)
        .scrollTo('bottom')

        cy.wait(500)

        cy.get('[class="name-cell"]')
        .contains('M17_SWex.image.moment.minimum')

        cy.get('[class="name-cell"]')
        .contains('M17_SWex.image.moment.minimum_coord')
    })

})

describe('Generate Moment map for M17_SWex.hdf5:', () => {
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

    it(`Open image M17_SWex.hdf5`,()=>{
        cy.get('[class="bp3-input"]').type('M17_SWex.hdf5')
        cy.get(`[title="M17_SWex.hdf5"]`).dblclick()
    })

    it(`Moment generator Dialog`,()=>{
        cy.wait(5000)
        cy.get('[id="SpectralProfilerButton"]').click()

        //Open Moment generator dialog
        cy.get('[d="M 0.81609227,1.2562455 V 14.58427 H 3.5600972 V 5.2322526 h 0.037333 L 6.8641032,14.58427 H 9.1227739 L 12.389446,5.1389191 h 0.03733 V 14.58427 h 2.744005 V 1.2562455 H 11.045444 L 8.0961054,10.421595 H 8.058772 L 4.941433,1.2562455 Z"]').click({ force: true })

        //set Image
        cy.get('select').eq(9).select("0: M17_SWex.hdf5")

        //set Region: Image
        cy.get('select').eq(10).select("Image")

        //set Coordinate: Channel
        cy.get('select').eq(11).select("Channel")

        //set Range
        cy.get('[class="bp3-input"]').eq(9).clear()
        cy.get('[class="bp3-input"]').eq(10).clear().type("24")

        //click moment
        cy.get('[class="bp3-input-ghost bp3-multi-select-tag-input-input"]').click()

        //select moment number would like to generate
        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("-1: Mean value of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("1: Intensity weighted coordinate")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("2: Intensity weighted dispersion of the coordinate")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("3: Median value of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("4: Median coordinate")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("5: Standard deviation about the mean of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("6: Root mean square of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("7: Absolute mean deviation of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("8: Maximum value of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("9: Coordinate of the maximum value of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("10: Minimum value of the spectrum")
        .click()

        cy.get('[class="bp3-text-overflow-ellipsis bp3-fill"]')
        .contains("11: Coordinate of the minimum value of the spectrum")
        .click()

        //click Generate
        cy.get('[class="bp3-button-text"]').contains("Generate").click()
        cy.wait(10000)
    })

    it(`Check the generated moment maps in Image List`,()=>{
        cy.get('[class="name-cell"]').eq(1)
        .contains('M17_SWex.hdf5.moment.integrated')

        cy.get('[class="name-cell"]').eq(2)
        .contains('M17_SWex.hdf5.moment.average')

        cy.get('[class="name-cell"]').eq(3)
        .contains('M17_SWex.hdf5.moment.weighted_coord')

        cy.get('[class="name-cell"]').eq(4)
        .contains('M17_SWex.hdf5.moment.weighted_dispersion_coord')

        cy.get('[class="name-cell"]').eq(5)
        .contains('M17_SWex.hdf5.moment.median')

        cy.get('[class="name-cell"]').eq(6)
        .contains('M17_SWex.hdf5.moment.standard_deviation')

        cy.get('[class="name-cell"]').eq(7)
        .contains('M17_SWex.hdf5.moment.rms')

        cy.get('[class="name-cell"]').eq(8)
        .contains('M17_SWex.hdf5.moment.abs_mean_dev')

        cy.get('[class="name-cell"]').eq(9)
        .contains('M17_SWex.hdf5.moment.maximum')

        cy.get('[class="name-cell"]').eq(10)
        .contains('M17_SWex.hdf5.moment.maximum_coord')

        //cy.get('[class="name-cell"]') only get 10 items

        cy.get('[class="bp3-table-quadrant-scroll-container"]').eq(0)
        .scrollTo('bottom')

        cy.wait(500)

        cy.get('[class="name-cell"]')
        .contains('M17_SWex.hdf5.moment.minimum')

        cy.get('[class="name-cell"]')
        .contains('M17_SWex.hdf5.moment.minimum_coord')
    })

})