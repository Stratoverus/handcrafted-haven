'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, MailOpen, ArrowLeft, Reply } from 'lucide-react';

interface Message {
  id: string;
  subject: string;
  content: string;
  senderId: string;
  receiverId: string;
  productId?: string;
  sendAsShop: boolean;
  isRead: boolean;
  createdAt: string;
  Sender: {
    id: string;
    name?: string;
    email: string;
    shopName?: string;
  };
  Receiver: {
    id: string;
    name?: string;
    email: string;
    shopName?: string;
  };
  Product?: {
    id: string;
    title: string;
  };
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [replyError, setReplyError] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [shopName, setShopName] = useState('');
  const [userName, setUserName] = useState('');
  const [sendAsShop, setSendAsShop] = useState(false);

  useEffect(() => {
    fetchMessages();
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        setIsSeller(data.user.isSeller || false);
        setShopName(data.user.shopName || '');
        setUserName(data.user.name || '');
      }
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      
      if (res.ok) {
        setMessages(data.messages || []);
        // Get current user ID from first message
        if (data.messages && data.messages.length > 0) {
          const firstMsg = data.messages[0];
          setCurrentUserId(firstMsg.senderId === firstMsg.Sender.id 
            ? firstMsg.senderId 
            : firstMsg.receiverId);
        }
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const res = await fetch(`/api/messages/${messageId}`, {
        method: 'PATCH',
      });

      if (res.ok) {
        setMessages(messages.map(msg => 
          msg.id === messageId ? { ...msg, isRead: true } : msg
        ));
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleMessageClick = async (message: Message) => {
    setSelectedMessage(message);
    setIsReplying(false);
    setReplyContent('');
    setReplyError('');
    setSendAsShop(false);
    
    // Mark as read if user is the receiver and message is unread
    if (message.receiverId === currentUserId && !message.isRead) {
      await markAsRead(message.id);
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !replyContent.trim()) return;

    setSendingReply(true);
    setReplyError('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `Re: ${selectedMessage.subject}`,
          content: replyContent,
          receiverId: selectedMessage.senderId,
          productId: selectedMessage.productId || null,
          sendAsShop: sendAsShop,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send reply');
      }

      // Refresh messages and reset reply form
      await fetchMessages();
      setReplyContent('');
      setIsReplying(false);
      setSendAsShop(false);
    } catch (err: any) {
      setReplyError(err.message || 'Failed to send reply');
    } finally {
      setSendingReply(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-6">
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/account/profile"
          className="p-2 hover:bg-gray-100 rounded cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold">Messages</h1>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white border rounded-lg p-8 text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">No messages yet</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {/* Messages List */}
          <div className="md:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
            {messages.map((message) => {
              const isReceiver = message.receiverId === currentUserId;
              const otherUser = isReceiver ? message.Sender : message.Receiver;
              const isUnread = isReceiver && !message.isRead;

              return (
                <div
                  key={message.id}
                  onClick={() => handleMessageClick(message)}
                  className={`p-4 border rounded-lg cursor-pointer transition ${
                    selectedMessage?.id === message.id
                      ? 'bg-[#CF5C36] text-white'
                      : isUnread
                      ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {isUnread ? (
                        <Mail className="h-4 w-4" />
                      ) : (
                        <MailOpen className="h-4 w-4" />
                      )}
                      <span className="font-medium text-sm">
                        {isReceiver ? 'From' : 'To'}: {
                          isReceiver 
                            ? (message.sendAsShop && message.Sender.shopName) ? message.Sender.shopName : (message.Sender.name || message.Sender.email)
                            : (otherUser.shopName || otherUser.name || otherUser.email)
                        }
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm mb-1 truncate">
                    {message.subject}
                  </h3>
                  <p className="text-xs opacity-75">
                    {formatDate(message.createdAt)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Message Details */}
          <div className="md:col-span-2">
            {selectedMessage ? (
              <div className="bg-white border rounded-lg p-6">
                <div className="mb-4 pb-4 border-b">
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex justify-between text-sm text-gray-600">
                    <div>
                      <strong>From:</strong> {
                        selectedMessage.sendAsShop && selectedMessage.Sender.shopName
                          ? selectedMessage.Sender.shopName
                          : (selectedMessage.Sender.name || selectedMessage.Sender.email)
                      }
                      {selectedMessage.sendAsShop && selectedMessage.Sender.shopName && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Shop
                        </span>
                      )}
                    </div>
                    <div>
                      {formatDate(selectedMessage.createdAt)}
                    </div>
                  </div>
                  {selectedMessage.Product && (
                    <div className="mt-2">
                      <Link
                        href={`/product/${selectedMessage.Product.id}`}
                        className="text-[#CF5C36] hover:underline text-sm cursor-pointer"
                      >
                        Related Product: {selectedMessage.Product.title}
                      </Link>
                    </div>
                  )}
                </div>
                <div className="whitespace-pre-wrap mb-6">
                  {selectedMessage.content}
                </div>

                {/* Reply Section */}
                {!isReplying ? (
                  <button
                    onClick={() => setIsReplying(true)}
                    className="flex items-center gap-2 text-[#CF5C36] hover:text-[#b84f2f] transition cursor-pointer"
                  >
                    <Reply className="h-4 w-4" />
                    <span>Reply</span>
                  </button>
                ) : (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">Reply to this message</h3>
                    <form onSubmit={handleReply} className="space-y-3">
                      {/* Send As (only for sellers) */}
                      {isSeller && shopName && (
                        <div>
                          <label className="block text-sm font-medium mb-2">Send as:</label>
                          <div className="flex gap-4">
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                checked={!sendAsShop}
                                onChange={() => setSendAsShop(false)}
                                className="mr-2 cursor-pointer"
                              />
                              <span>{userName || 'Myself'}</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                checked={sendAsShop}
                                onChange={() => setSendAsShop(true)}
                                className="mr-2 cursor-pointer"
                              />
                              <span>{shopName}</span>
                            </label>
                          </div>
                        </div>
                      )}
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        style={{ border: '2px solid #6B7280' }}
                        className="w-full rounded px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-[#CF5C36] bg-white resize-none"
                        placeholder="Type your reply..."
                        required
                      />
                      {replyError && (
                        <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded text-sm">
                          {replyError}
                        </div>
                      )}
                      <div className="flex gap-3 justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setIsReplying(false);
                            setReplyContent('');
                            setReplyError('');
                            setSendAsShop(false);
                          }}
                          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={sendingReply || !replyContent.trim()}
                          className="px-4 py-2 bg-[#CF5C36] text-white rounded hover:bg-[#b84f2f] transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                        >
                          {sendingReply ? 'Sending...' : 'Send Reply'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border rounded-lg p-8 text-center h-full flex items-center justify-center">
                <p className="text-gray-600">Select a message to view</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
