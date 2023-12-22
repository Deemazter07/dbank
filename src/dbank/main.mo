import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";
actor Dbank {
  stable var currentValue : Float = 400;
  currentValue := 100;

  stable var startTime = Time.now();
  startTime := Time.now();

  let id = 129389321;

  // Debug.print(debug_show ("currentValue", currentValue));
  // Debug.print(debug_show ("id", id));

  public func topUp(amount : Float) {
    currentValue += amount;
    Debug.print(debug_show ("topUP", currentValue));
  };

  public func withdraw(amount : Float) {
    let tempValue : Float = currentValue - amount;
    if (tempValue >= 0) {
      currentValue -= amount;
      Debug.print(debug_show ("withdraw", currentValue));
    } else {
      Debug.print("amount to large.");
    };
  };

  public query func checkBalance() : async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;

    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;
  };

};
