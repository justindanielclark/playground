const SubscriberPublisherController = (()=>{
  function subscription(eventName, func, priority, excludeSelf = true){
    this.eventName = eventName;
    this.func = func;
    this.priority = priority;
    this.excludeSelf = excludeSelf;
  }
  function subscriptionList(){
    this.list = {
      //eventName: [subscription, subscription]
      //eventName2: [subscription, subscription, subscription]
    }
  }
    subscriptionList.prototype = {
      addSubscription: function(subscription){
        const {eventName} = subscription;
        if(this.list[eventName] instanceof Array){
          this.list[eventName].push(subscription);
          this.list[eventName].sort((a,b) => a.priority-b.priority);
        } else {
          this.list[eventName] =  [subscription];
        }
      },
      getSubscriptions: function(eventName){
        return this.list[eventName];
      }
    }
  const _subscriptions = new subscriptionList();
  function  _publish(eventName, passedVal){ 
    const eventsList = _subscriptions.getSubscriptions(eventName);
    eventsList.forEach(subscription => { 
      subscription.func(passedVal);
    }); 
  }
  function _subscribe(subscription){
    _subscriptions.addSubscription(subscription);
    this.subscriptions.addSubscription(subscription);
  }
  
  function subscriberWrapper(object){ 
    object.subscribe = _subscribe;
    object.subscriptions = new subscriptionList();
  } 
  function publishWrapper(object){ 
    object.publish =  _publish; 
  }
  function wrapper(object){ 
    subscriberWrapper(object);
    publishWrapper(object);
  }  
  return {wrapper, subscription, subscriberWrapper, publishWrapper} 
 })()

 export default SubscriberPublisherController;