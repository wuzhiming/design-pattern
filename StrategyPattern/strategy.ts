interface FlyBehavior{
    fly();
}
interface QuackBehavior {
    quack();
}
abstract class Duck {
    private flyBefavour:FlyBehavior;
    private quackBefavour:QuackBehavior;
}