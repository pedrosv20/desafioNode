//
//  ViewController.swift
//  alamofireTeste
//
//  Created by Pedro Vargas on 15/04/20.
//  Copyright © 2020 Pedro Vargas. All rights reserved.
//

import UIKit
import Alamofire

class ViewController: UIViewController {

    var parametro: String = ""
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    
    @IBAction func getDiferenca(_ sender: Any) {
        AF.request( "http://127.0.0.1:3000/diferenca",method: .get, parameters: ["data" : parametro])
        .responseJSON { response in
            print(response.request)
            switch response.result {
            case let .success(value):
               do {
                    let jsonData = try JSONSerialization.data(withJSONObject: value, options: .prettyPrinted)
                    let decoded = try JSONSerialization.jsonObject(with: jsonData, options: [])
                    if let dictFromJSON = decoded as? [String: Any] {
                        print("Resposta = \(dictFromJSON)")
                    }
                } catch {
                    print(error.localizedDescription)
                }
            case let .failure(error):
                print(error)
            }
        }
        
    }
    
    @IBAction func change(_ sender: UITextField) {
        parametro = sender.text!
        print(sender.text!)
    }
    
    @IBAction func post(_ sender: Any) {
        let date = Date()
        let format = DateFormatter()
        format.dateFormat = "yyyy-MM-dd"
        let formattedDate = format.string(from: date)
        
        let headers: HTTPHeaders = ["Authorization": "Bearer"]
        var params =  ["text": "\(parametro)","creationTime": "\(formattedDate)"] as [String : Any]
        
        
        AF.request("http://127.0.0.1:4548/createReflection", method: .post, parameters: params, headers: headers).responseString  { response in
            print(response.result)
        }
    }
    
    @IBAction func getReflectionById(_ sender: Any) {
        AF.request( "http://127.0.0.1:4548/reflection/\(parametro)",method: .get, parameters: nil)
        .responseJSON { response in
            print(response.result)
            switch response.result {
            case let .success(value):
               do {
                    let jsonData = try JSONSerialization.data(withJSONObject: value, options: .prettyPrinted)
                    let decoded = try JSONSerialization.jsonObject(with: jsonData, options: [])
                    if let dictFromJSON = decoded as? [String: Any] {
                        print("Resposta = \(dictFromJSON)")
                    }
                } catch {
                    print(error.localizedDescription)
                }
            case let .failure(error):
                print(error)
            }
        }
    }
    
    @IBAction func deleteReflectionById(_ sender: Any) {
        AF.request("http://127.0.0.1:4548/delete/\(parametro)",method: .get, parameters: nil)
        .responseJSON { response in
            print(response.result)
        }
    }
    
    @IBAction func updateReflection(_ sender: Any) {
        let headers: HTTPHeaders = ["Authorization": "Bearer"]
        var params =  ["text": "\(parametro)"] as [String : Any]
        AF.request("http://127.0.0.1:4548/update/3", method: .put, parameters: params, headers: headers).responseString  { response in
            print(response.result)
        }
    }
    
    @IBAction func consultaData(_ sender: Any) {
        var params =  ["from": "10022000", "to": "10052020"] as [String : Any]
        AF.request("http://127.0.0.1:4548/reflection", method: .get, parameters: params).responseString  { response in
            print(response.result)
        }
    }
}

