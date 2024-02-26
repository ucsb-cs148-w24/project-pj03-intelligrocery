# Testing

Document the testing library and approach/es you experimented with and the unit test(s) that you implemented in your codebase.

#### Libraries
* Jest
* @testing-library/react-native

The testing libraries we used were jest and @testing-library/react-native. There were a few niche errors that we had to deal with. The most notable one was the specific jest libraries for React Native. When writing unit tests, we started off simple and made sure that the jest tests were working properly by testing that App.js was rendering correctly. Once that unit test returned results that we wanted, we proceeded to test our "Add Ingredient" feature. We used Github Copilot and GPT-4 to help write test code. This test case was relatively large and needed a lot of tweaks even while using Github Copilot and GPT-4.


#### Component Testing
* Jest
* @testing-library/react-native

We used the same libraries for component testing. We tested the PantryItem component, which checks that it renders and mocks some data. We used Github Copilot and GPT-4 to help write test code. This test case was relatively large and needed a lot of tweaks even while using Github Copilot and GPT-4.

#### Future Plans with Testing

We plan to not extensively test in the future because of the scope of this class. At most, we will test certain components to verify that they are working as intended, but once again, we do not plan on having tests for every section of our project. We want to spend our energy on new features and verifying that they check with expo. 
