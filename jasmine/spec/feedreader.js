/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds Tests: ', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('Are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Are all URL defined and not empty', function() {
            allFeeds.forEach(feed => {
                expect(feed.url.toBeDefined);
                expect(feed.url.length).toBeGreaterThan(0);
            })
        })

        /* in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Are all feed name defined and not empty', function() {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined;
                expect(feed.name.length).not.toBe(0);
            })
        })
    });

    /* Write a new test suite named "The menu" */
    describe('Menu Tests: ', function() {
        /* test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('Is menue element hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        })

        /* test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('Menu element visible when clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            expect($('div').hasClass('slide-menu')).toBeTruthy();
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        })
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries Tests: ', function() {
        /* ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(1, done);
        });
        it('loadFeed() should contain an element', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection: ', function() {
        /* ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let feedContentOne;
        let feedContentTwo;
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedContentOne = $('.feed').contents();
                loadFeed(1, function() {
                    feedContentTwo = $('.feed').contents();
                });
                done();
            });
        });

        it('loadFeed() content should change', function() {
            expect(feedContentOne !== feedContentTwo).toBeTruthy();
        });
    });
}());