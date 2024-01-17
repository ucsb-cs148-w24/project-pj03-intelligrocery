//
//  ContentView.swift
//  HelloWord
//
//  Created by Nadav Avital on 1/12/24.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView{
            VStack {
                Image(systemName: "smiley")
                    .imageScale(.large)
                    .foregroundStyle(.white)
                Text("Hello, World!")
                    .font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/)
                    .foregroundStyle(.white)
            }
            .padding()
            .padding()
            .background(.blue)
            .clipShape(Capsule())
            .shadow(radius: 15)
            .navigationTitle("CS 148 Lab 1")
        }
    }
}

#Preview {
    ContentView()
}
